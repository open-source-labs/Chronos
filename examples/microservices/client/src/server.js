// const path = require('path');
// const express = require('express');

// const PORT = 5001;

// const chronosConfig = require('./chronos-config');
// const Chronos = require('../../../../chronos_npm_package/chronos');
// const chronos = new Chronos(chronosConfig);
// chronos.propagate();

// const app = express();

// const trackingMiddleware = chronos.track();
// app.use(trackingMiddleware);

// app.use('/assets', express.static(path.resolve(__dirname, './assets')));

// app.use('*', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, './index.html'));
// });

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: 'Something went wrong' });
// });

// const start = () => {
//   app.listen(PORT, () => {
//     console.log(`Client server listening on port ${PORT}`);
//   });
// };

// start();
// const path = require('path');
// const express = require('express');

// const PORT = 5001;

// // Verify that './chronos-config' exists and exports the proper configuration
// const chronosConfig = require('./chronos-config');

// // Verify that the relative path points to your Chronos module.
// // If Chronos is published on npm or is available via a package alias, you might instead do:
// //    const Chronos = require('chronos');
// // Otherwise, ensure that the file exists at the given relative path.
//  const Chronos = require('../../../../chronos_npm_package/dist/chronos.js');
// // const Chronos = require('chronos');

// // Create a new Chronos instance with your configuration
// const chronos = new Chronos(chronosConfig);

// // Initialize propagation. (Ensure that chronos.propagate() is defined and works as expected.)
// chronos.propagate();

// // Create the Express app
// const app = express();

// // Use Chronos’ tracking middleware
// const trackingMiddleware = chronos.track();
// app.use(trackingMiddleware);

// // Serve static assets from the './assets' directory
// app.use('/assets', express.static(path.resolve(__dirname, './assets')));

// // For any other route, send the index.html file
// app.use('*', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, './index.html'));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: 'Something went wrong' });
// });

// // Start the server on PORT
// const start = () => {
//   app.listen(PORT, () => {
//     console.log(`Client server listening on port ${PORT}`);
//   });
// };

// const path = require('path');
// const express = require('express');

// const PORT = 5001;

// // Verify that './chronos-config' exists and exports the proper configuration
// const chronosConfig = require('./chronos-config');

// (async () => {
//   try {
//     // Dynamically import the Chronos ES module
//     const ChronosModule = await import('../../../../chronos_npm_package/dist/chronos.js');
//     const Chronos = ChronosModule.default;

//     // Create a new Chronos instance with your configuration
//     const chronos = new Chronos(chronosConfig);

//     // Initialize propagation (assuming chronos.propagate() is defined)
//     chronos.propagate();

//     // Create the Express app
//     const app = express();

//     // Use Chronos’ tracking middleware
//     const trackingMiddleware = chronos.track();
//     app.use(trackingMiddleware);

//     // Serve static assets from the './assets' directory
//     app.use('/assets', express.static(path.resolve(__dirname, './assets')));

//     // For any other route, send the index.html file
//     app.use('*', (req, res) => {
//       res.status(200).sendFile(path.resolve(__dirname, './index.html'));
//     });

//     // Error handling middleware
//     app.use((err, req, res, next) => {
//       res.status(500).send({ message: 'Something went wrong' });
//     });

//     // Start the server on PORT
//     app.listen(PORT, () => {
//       console.log(`Client server listening on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Failed to load Chronos module:', err);
//     process.exit(1);
//   }
// })();
import path from 'path';
import express from 'express';

const PORT = 5001;

// Verify that './chronos-config' exists and exports the proper configuration
// const chronosConfig = require('./chronos-config');
// import chronosConfig from './chronos-config.js';

import * as chronosConfig from './chronos-config.js';

(async () => {
  try {
    // Dynamically import the Chronos ES module from the dist folder
    const ChronosModule = await import('../../../../chronos_npm_package/dist/chronos.js');
    const Chronos = ChronosModule;

    // Create a new Chronos instance with your configuration
    const chronos = new Chronos(chronosConfig);

    // Initialize propagation (assumes chronos.propagate() is defined)
    chronos.propagate();

    // Create the Express app
    const app = express();

    // Use Chronos’ tracking middleware
    const trackingMiddleware = chronos.track();
    app.use(trackingMiddleware);

    // Serve static assets from the './assets' directory
    app.use('/assets', express.static(path.resolve(__dirname, './assets')));

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
