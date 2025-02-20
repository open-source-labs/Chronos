
import path from 'path';
import express from 'express';
import { dirname } from 'path';
const PORT = 5001;

// Verify that './chronos-config' exists and exports the proper configuration
// const chronosConfig = require('./chronos-config');
import chronosConfig from './chronos-config.js';
import {Chronos} from '../../../../chronos_npm_package/dist/chronos.js'
// import * as chronosConfig from './chronos-config.js';

(async () => {
  try {
    // Dynamically import the Chronos ES module from the dist folder
    const ChronosModule = await Chronos;
    // const Chronos = ChronosModule;

    // Create a new Chronos instance with your configuration
    const chronos = new ChronosModule(chronosConfig);

    // Initialize propagation (assumes chronos.propagate() is defined)
    chronos.propagate();

    // Create the Express app
    const app = express();

    // Use Chronos’ tracking middleware
    const trackingMiddleware = chronos.track();
    app.use(trackingMiddleware);

    // Serve static assets from the './assets' directory
    app.use('/assets', express.static('assets'));

    // For any other route, send the index.html file
    app.use('*', (req, res) => {
      res.status(200).sendFile(path.resolve(__dirname, './index.html'));
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      res.status(500).send({ message: 'Something went wrong' });
    });

    // Start the server on PORT
    app.listen(PORT, () => {
      console.log(`Client server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to load Chronos module:', err);
    process.exit(1);
  }
})();
