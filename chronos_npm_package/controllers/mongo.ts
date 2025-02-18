import mongoose from 'mongoose';
import alert from './alert.js';
import CommunicationModel from '../models/CommunicationModel.js';
import ServicesModel from '../models/ServicesModel.js';
import HealthModelFunc from '../models/HealthModel.js';
import ContainerInfoFunc from '../models/ContainerInfo.js';
import KafkaModel from '../models/KafkaModel.js';
import KubernetesModel from '../models/KubernetesModel.js';

// Imports the object instead of a direct function
import healthHelpers from './healthHelpers.js';
import MetricsModel from '../models/MetricsModel.js';
import dockerHelper from './dockerHelper.js';
import utilities from './utilities.js';
import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel.js';

//Enforces strict query behavior in Mongoose 
mongoose.set('strictQuery', true);

// Define the mongo object to store functions
const mongo: any = {};

/**
 *  Connect to MongoDB
 * - Uses an async function to establish a connection.
 * - Catches errors to prevent crashing on failed connection attempts.
 */
mongo.connect = async ({ database }: { database: { URI: string } }) => {
  console.log('Attempting to connect to database...');
  try {
    await mongoose.connect(database.URI);
    console.log(`✅ MongoDB database connected at ${database.URI.slice(0, 20)}...`);
  } catch (error: any) {
    console.log('❌ Error connecting to MongoDB:', error.message);
  }
};

/**
  Create services collection
 * - Stores details about microservices and their monitoring intervals.
 */
mongo.services = ({ microservice, interval }: { microservice: string; interval: number }) => {
  console.log(`Saving "${microservice}" to services...`);
  const newService = new ServicesModel({ microservice, interval });

  newService
    .save()
    .then(() => console.log(`✅ Added new service "${microservice}"`))
    .catch(err => console.log(`❌ Error saving service "${microservice}": `, err.message));
};

/**
  Logs each request/response cycle
 * - Optionally sends Slack/Email alerts if an error (status >= 400) is encountered.
 */
mongo.communications = ({ microservice, slack, email }: any) => {
  console.log('Recording request cycle...');
  return function (req: any, res: any, next: any) {
    const newComms = {
      microservice,
      endpoint: req.originalUrl,
      request: req.method,
      correlatingid: res.getHeaders()['x-correlation-id'],
    };

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
        if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
      }
      newComms['responsestatus'] = res.statusCode;
      newComms['responsemessage'] = res.statusMessage;

      new CommunicationModel(newComms)
        .save()
        .then(() => console.log('✅ Request cycle saved'))
        .catch(err => console.log(`❌ Error saving communications: `, err.message));
    });

    next();
  };
};

/**
  Collects system health data at specified intervals
 * - Uses `healthHelpers.collectHealthData()` to gather CPU, memory, and process metrics.
 */
mongo.health = async ({ microservice, interval, mode }: any) => {
  const pollInterval = interval || 10000; // Default interval: 10 seconds

  setInterval(() => {
    healthHelpers
      .collectHealthData()
      .then(async (healthMetrics: any[]) => {
        const currentMetrics = await MetricsModel.find({ mode });
        if (currentMetrics.length !== healthMetrics.length) {
          await mongo.addMetrics(healthMetrics, mode, currentMetrics);
        }
        await HealthModelFunc.insertMany(healthMetrics);
      })
      .then(() => console.log('✅ Health data recorded in MongoDB'))
      .catch((err: any) => console.log('❌ Error inserting health documents:', err));
  }, pollInterval);
};

/**
  Collects container info if running in Docker
 * - Uses `dockerHelper` to fetch container stats at regular intervals.
 */
mongo.docker = ({ microservice, interval, mode }: any) => {
  const pollInterval = interval || 10000;

  dockerHelper
    .getDockerContainer(microservice)
    .then(containerData => {
      setInterval(() => {
        dockerHelper
          .readDockerContainer(containerData)
          .then(data => ContainerInfoFunc.create(data))
          .catch(err => {
            throw new Error(err);
          });
      }, pollInterval);
    })
    .catch(error => {
      throw new Error(error);
    });
};

/**
  Runs queries for Kafka, Kubernetes, or Docker at intervals
 */
mongo.serverQuery = async (config: any) => {
  await mongo.saveService(config);
  await mongo.setQueryOnInterval(config);
};

/**
  Saves microservice info in the 'services' table
 */
mongo.saveService = (config: any) => {
  let microservice;
  if (config.mode === 'kafka') {
    microservice = 'kafkametrics';
  } else if (config.mode === 'kubernetes') {
    microservice = 'kubernetesmetrics';
  } else if (config.mode === 'docker') {
    microservice = `${config.containerName}`;
  } else {
    throw new Error('❌ Unrecognized mode');
  }

  new ServicesModel({ microservice, interval: config.interval })
    .save()
    .then(() => console.log(`✅ Added "${microservice}" to services`))
    .catch(err => console.log(`❌ Error saving "${microservice}": `, err.message));
};

/**
  Collects new metrics at intervals and updates dashboards
 */
mongo.setQueryOnInterval = async (config: any) => {
  let model: any;
  let metricsQuery: Function;
  let length = 0;
  const currentMetricNames: Record<string, boolean> = {};

  if (config.mode === 'kafka') {
    model = KafkaModel;
    metricsQuery = utilities.helpers.kafkaMetricsQuery;
  } else if (config.mode === 'kubernetes') {
    model = KubernetesModel;
    metricsQuery = utilities.helpers.promMetricsQuery;
  } else if (config.mode === 'docker') {
    model = ContainerInfoFunc;
    metricsQuery = utilities.helpers.promMetricsQuery;
  } else {
    throw new Error('❌ Unrecognized mode');
  }

  length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);

  setInterval(() => {
    metricsQuery(config)
      .then(async (parsedArray: any[]) => {
        console.log('parsedArray.length:', parsedArray.length);
        if (length !== parsedArray.length) {
          length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
        }

        await mongo.createGrafanaDashboards(config, await model.find({}));
      })
      .catch(err => console.log(`❌ Error inserting ${config.mode} documents in MongoDB:`, err));
  }, config.interval || 40000);
};

/**
 Automatically creates Grafana dashboards for collected metrics
 */
mongo.createGrafanaDashboards = async (config: any, parsedArray: any[]) => {
  try {
    console.log('📊 Creating Grafana Dashboards');
    const datasource = await utilities.helpers.getGrafanaDatasource(config.grafanaAPIKey);
    for (let metric of parsedArray) {
      await utilities.helpers.createGrafanaDashboard(metric, datasource, 'timeseries', config.grafanaAPIKey);
    }
  } catch (err) {
    console.error('❌ Error in mongo.createGrafanaDashboards:', err);
  }
};

/**
  Stores the Grafana API Key in MongoDB 
 */
mongo.storeGrafanaAPIKey = async (config: any) => {
  try {
    await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
    console.log('✅ Grafana API Key stored');
  } catch (err) {
    console.error('❌ Error storing Grafana API Key:', err);
  }
};

export default mongo;
