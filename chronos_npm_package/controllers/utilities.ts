import axios from 'axios';
import { createGrafanaPanelObject, updateGrafanaPanelObject } from './GrafanaPanel.js';

/**
 * Interfaces for TypeScript
 */
interface DatabaseConfig {
  type: 'MongoDB' | 'PostgreSQL';
  URI: string;
  connection?: 'REST' | 'gRPC';
}

interface ChronosConfig {
  microservice: string;
  interval: number;
  dockerized?: boolean;
  jmxuri?: string;
  port?: number;
  mode: 'kafka' | 'kubernetes' | 'microservices' | 'docker';
  promService?: string;
  promPort?: number;
  database: DatabaseConfig;
  notifications?: Array<{
    type: 'slack' | 'email' | 'sms';
    settings: any;
  }>;
  containerName?: string;
  grafanaAPIKey?: string;
}

/** A sample interface for metric data */
interface MetricData {
  metric: string;
  value: number;
  time: number;
  category: string;
}

/**
 * Define an interface for the helpers object.
 * Add or adjust the signatures for each helper as needed.
 */
export interface Helpers {
  validateInput: (config: Partial<ChronosConfig>) => ChronosConfig;
  addNotifications: (config: ChronosConfig) => ChronosConfig;
  getMetricsURI: (config: ChronosConfig) => string;
  testMetricsQuery: (config: ChronosConfig) => Promise<any>;
  kafkaMetricsQuery: (config: ChronosConfig) => Promise<MetricData[]>;
  extractWord: (mode: string, text: string) => MetricData[];
  promMetricsQuery: (config: ChronosConfig) => Promise<MetricData[]>;
  parseProm: (config: ChronosConfig, data: any[]) => MetricData[];
  createGrafanaDashboard: (
    metric: { metric: string },
    datasource: { type: string; uid: string },
    graphType: string,
    token: string
  ) => Promise<void>;
  getGrafanaDatasource: (token: string) => Promise<any>;
  updateGrafanaDatasource: (token: string) => Promise<any>;
  updateGrafanaDashboard: (
    graphType: string,
    token: string,
    metric: string,
    datasource: any
  ) => Promise<void>;
}

/**
 * Define an interface for the default export.
 */
export interface Utilities {
  helpers: Helpers;
}

/**
 * All utility functions are nested inside 'helpers'.
 * That means in other files: `utilities.helpers.<function>`
 */
const helpers: Helpers = {
  validateInput: (config: Partial<ChronosConfig>): ChronosConfig => {
    const { microservice, database, interval, dockerized, jmxuri, mode, promService, promPort } =
      config as ChronosConfig;

    if (!microservice || typeof microservice !== 'string') {
      throw new Error('Invalid input "microservice": Please provide a name for your microservice');
    }

    if (!database?.type || typeof database.type !== 'string') {
      throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
    }

    if (!database.URI || typeof database.URI !== 'string') {
      throw new Error('Invalid input "database URI": Please provide the URI to your database');
    }

    if (!database.connection || typeof database.connection !== 'string') {
      throw new Error('Invalid "database connection" type: Please provide "REST" or "gRPC"');
    }

    const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];
    if (!mode || !modeTypes.includes(mode)) {
      throw new Error(
        'You must input a mode. Options: "kubernetes", "kafka", "microservices", or "docker"'
      );
    }

    if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
      throw new Error('Invalid input for "jmxuri": Must be a string');
    }

    if ((mode === 'kubernetes' || mode === 'docker') && (!promService || !promPort)) {
      throw new Error('Missing "promService" or "promPort" for mode "kubernetes"/"docker"');
    }

    if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
      throw new Error(`Invalid database type "${database.type}". Only PostgreSQL and MongoDB.`);
    }
    if (database.connection !== 'REST' && database.connection !== 'gRPC') {
      throw new Error(`Invalid db connection "${database.connection}". Only REST/gRPC supported.`);
    }

    // Default interval to one minute
    if (!interval || typeof interval !== 'number') config.interval = 60000;
    // Default dockerized to false
    if (dockerized === undefined) config.dockerized = false;

    return config as ChronosConfig;
  },

  addNotifications: (config: ChronosConfig): ChronosConfig => {
    const { notifications } = config;
    if (notifications) {
      const validFeatures = ['slack', 'email', 'sms'];
      notifications.forEach(obj => {
        if (!validFeatures.includes(obj.type)) {
          throw new Error(`${obj.type} is not a supported notification method for Chronos`);
        } else {
          // Insert the notification settings onto config
          (config as any)[obj.type] = obj.settings;
        }
      });
    }
    return config;
  },

  getMetricsURI: (config: ChronosConfig): string => {
    if (config.mode === 'kafka') {
      return config.jmxuri || '';
    } else if (config.mode === 'kubernetes' || config.mode === 'docker') {
      return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
    }
    throw new Error('Unrecognized mode');
  },

  testMetricsQuery: async (config: ChronosConfig) => {
    const URI = helpers.getMetricsURI(config) + 'up';
    try {
      const response = await axios.get<any>(URI);
      if (response.status !== 200) {
        console.error('Invalid response from metrics server:', URI, response.status, response.data);
      } else {
        console.log('Successful initial response from metrics server:', URI);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to query metrics server: ' + URI);
    }
  },

  kafkaMetricsQuery: async (config: ChronosConfig): Promise<MetricData[]> => {
    const URI = helpers.getMetricsURI(config);
    try {
      const response = await axios.get<any>(URI);
      return helpers.extractWord(config.mode, response.data ?? '');
    } catch (error) {
      console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
      return [];
    }
  },

  extractWord: (mode: string, text: string): MetricData[] => {
    const res: MetricData[] = [];
    const arr = text.split('\n');
    const time = Date.now();
    const category = 'Event';

    for (const element of arr) {
      if (!element || element.startsWith('#')) continue;
      if (mode === 'kafka' && (element.startsWith('jmx') || element.startsWith("'jmx"))) continue;

      const lastSpace = element.lastIndexOf(' ');
      const metric = element.slice(0, lastSpace);
      const val = Number(element.slice(lastSpace + 1));
      if (!isNaN(val)) {
        res.push({ metric, value: val, time, category });
      } else {
        console.error('Invalid metric (skipped):\n', element);
      }
    }
    return res;
  },

  promMetricsQuery: async (config: ChronosConfig): Promise<MetricData[]> => {
    const baseURI = helpers.getMetricsURI(config);
    const query =
      config.mode === 'docker'
        ? baseURI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`)
        : baseURI + encodeURIComponent('{__name__=~".+",container=""}');
    try {
      const response = await axios.get<any>(query);
      const result = response.data?.data?.result || [];
      return helpers.parseProm(config, result);
    } catch (error) {
      console.error(config.mode, '|', 'Error fetching from URI:', query, '\n', error);
      return [];
    }
  },

  parseProm: (config: ChronosConfig, data: any[]): MetricData[] => {
    const res: MetricData[] = [];
    const time = Date.now();
    const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';

    const names = new Set();

    for (const info of data) {
      let wholeName: string;
      let name: string;

      if (config.mode === 'docker') {
        if (!info.metric?.name) continue;
        wholeName = info.metric['__name__'];
        name = wholeName.replace(/.*\/.*\//g, '');
      } else {
        if (!info.metric?.job) continue;
        wholeName = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
        name = wholeName.replace(/.*\/.*\//g, '');
      }

      if (names.has(name)) continue;
      names.add(name);

      let value = info.value;
      if (Array.isArray(value)) value = value[1]; // e.g. [timestamp, val]
      if (isNaN(value)) continue;

      res.push({
        metric: wholeName,
        value: Number(value),
        time,
        category,
      });
    }
    console.log('is size equal?', res.length === new Set(res).size);
    return res;
  },

  createGrafanaDashboard: async (
    metric: { metric: string },
    datasource: { type: string; uid: string },
    graphType: string,
    token: string
  ) => {
    let uid = metric.metric.replace(/.*\/.*\//g, '');
    if (uid.length >= 40) {
      uid = uid.slice(uid.length - 39);
    }

    const dashboard = {
      dashboard: {
        id: null,
        uid,
        title: uid,
        tags: ['templated'],
        timezone: 'browser',
        schemaVersion: 16,
        version: 0,
        refresh: '10s',
        panels: [] as any[],
      },
      folderId: 0,
      overwrite: true,
    };

    dashboard.dashboard.panels.push(createGrafanaPanelObject(metric, datasource, graphType));

    try {
      const dashboardResponse = await axios.post<any>(
        'http://grafana:3000/api/dashboards/db',
        JSON.stringify(dashboard),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (dashboardResponse.status >= 400) {
        console.log('Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.');
      } else {
        console.log(`📊 Grafana graphs for "${metric.metric}" are ready 📊 `);
      }
    } catch (err) {
      console.log('Error creating Grafana dashboard:', err);
    }
  },

  getGrafanaDatasource: async (token: string) => {
    console.log('In utilities.getGrafanaDatasource!!!');
    const datasourceResponse = await axios.get<any>('http://grafana:3000/api/datasources', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    console.log('Successfully fetched datasource from Grafana API');

    const datasource = {
      type: datasourceResponse.data?.[0]?.type ?? 'unknown',
      uid: datasourceResponse.data?.[0]?.uid ?? 'unknown',
    };
    return datasource;
  },

  updateGrafanaDatasource: async (token: string) => {
    const datasourceResponse = await axios.get<any>('http://localhost:32000/api/datasources', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    console.log('Successfully fetched datasource from Grafana API');
    const datasource = {
      type: datasourceResponse.data?.[0]?.type ?? 'unknown',
      uid: datasourceResponse.data?.[0]?.uid ?? 'unknown',
    };
    console.log('datasource is', datasource);
    return datasource;
  },

  updateGrafanaDashboard: async (
    graphType: string,
    token: string,
    metric: string,
    datasource: any
  ) => {
    let uid = metric.replace(/.*\/.*\//g, '');
    if (uid.length >= 40) {
      uid = uid.slice(uid.length - 39);
    }

    const dashboard = {
      dashboard: {
        id: null,
        uid,
        title: uid,
        tags: ['templated'],
        timezone: 'browser',
        schemaVersion: 16,
        version: 0,
        refresh: '10s',
        panels: [] as any[],
      },
      folderId: 0,
      overwrite: true,
    };

    dashboard.dashboard.panels.push(updateGrafanaPanelObject(metric, datasource, graphType));

    try {
      const dashboardResponse = await axios.post<any>(
        'http://localhost:32000/api/dashboards/db',
        JSON.stringify(dashboard),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      if (dashboardResponse.status >= 400) {
        console.log('Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.');
      } else {
        console.log(`📊 Grafana graphs for "${metric.replace(/.*\/.*\//g, '')}" have been updated!!!`);
      }
    } catch (err) {
      console.log('Error updating Grafana dashboard:', err);
    }
  },
};

/** Export an object containing `helpers` with an explicit type */
const utilities: Utilities = { helpers };

export default utilities;