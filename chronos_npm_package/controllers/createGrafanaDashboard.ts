// const axios = require('axios');
// const createGrafanaPanelObject = require('./createGrafanaPanelObject,js');

// async function createGrafanaDashboard(
//     metrix,
//     datasource,
// ) {
//     // create dashboard object boilerplate
//     const dashboard = {
//         "dashboard": {
//             "id": null,
//             "uid": metrix.meric.replace(/.*\/.*\//g, ''),
//             "title": metrix.meric.replace(/.*\/.*\//g, ''),
//             "tags": ["templated"],
//             "timezone": "browser",
//             "schemaVersion": 16,
//             "version": 0,
//             "refresh": "10s",
//             panels: [],
//         },
//         folderId: 0,
//         overwrite: true,
//     };


//     // push panel into dashboard object with a line for each metric in promQLQueries object
//     dashboard.dashboard.panels.push(createGrafanaPanelObject(metrix, datasource));

//     try {
//         // POST request to Grafana Dashboard API to create a dashboard
//         const dashboardResponse = await axios.post(
//             'http://localhost:32000/api/dashboards/db',
//             JSON.stringify(dashboard),
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer glsa_pITqM0BIfNHNKL4PsXJqmTYQl0D9QGxF_486f63e1'
//                 },
//             }
//         );

//         // Descriptive error log for developers
//         if (dashboardResponse.status >= 400) {
//             console.log(
//                 'Error with POST request to Grafana Dashboards API. In createGrafanaDashboardObject.'
//             );
//         } else {
//             // A simple console log to show when graphs are done being posted to Grafana.
//             console.log(`📊 Grafana graphs 📊 for the ${containerName} container are ready!!`);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports = createGrafanaDashboard;

// 
// import axios from 'axios';
// import createGrafanaPanelObject from './GrafanaPanel'; // omit the '.ts' extension

// // Example interfaces – adjust to your actual data shape
// interface Metrix {
//   meric: string;            // Use "meric" if that’s the actual field, otherwise consider renaming to "metric"
//   containerName?: string;   // Optional field for container name
//   // add other fields as needed
// }

// interface Datasource {
//   // Define fields for your datasource object (e.g., name, type, url, etc.)
// }

// interface DashboardPanel {
//   // Define the structure returned by createGrafanaPanelObject if needed.
//   // For example:
//   // id: number;
//   // title: string;
//   // type: string;
//   // targets: any[];
// }

// export async function createGrafanaDashboard(
//   metrix: Metrix,
//   datasource: Datasource,
// ): Promise<void> {
//   // Create the dashboard payload
//   const dashboard = {
//     dashboard: {
//       id: null,
//       uid: metrix.meric.replace(/.*\/.*\//g, ''),
//       title: metrix.meric.replace(/.*\/.*\//g, ''),
//       tags: ['templated'],
//       timezone: 'browser',
//       schemaVersion: 16,
//       version: 0,
//       refresh: '10s',
//       panels: [] as DashboardPanel[],  // Type the panels array if you know the panel's structure
//     },
//     folderId: 0,
//     overwrite: true,
//   };

//   // Create a panel using the imported function and add it to the dashboard
//   const panel = createGrafanaPanelObject(metrix, datasource);
//   dashboard.dashboard.panels.push(panel);

//   try {
//     // POST request to Grafana Dashboard API to create or update a dashboard
//     const dashboardResponse = await axios.post(
//       'http://localhost:32000/api/dashboards/db',
//       JSON.stringify(dashboard), // You can also pass 'dashboard' directly; axios handles JSON conversion.
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer glsa_pITqM0BIfNHNKL4PsXJqmTYQl0D9QGxF_486f63e1',
//         },
//       },
//     );

//     // Check the response status (axios throws for 4xx/5xx errors by default)
//     if (dashboardResponse.status >= 400) {
//       console.error('Error with POST request to Grafana Dashboards API.');
//     } else {
//       // Log success message, using containerName if available
//       if (metrix.containerName) {
//         console.log(`📊 Grafana graphs for the "${metrix.containerName}" container are ready!`);
//       } else {
//         console.log('📊 Grafana graphs are ready!');
//       }
//     }
//   } catch (err) {
//     console.error('Error creating Grafana dashboard:', err);
//   }
// }
// import axios from 'axios';
// // Import the default export from GrafanaPanel.ts as an object.
// import GrafanaPanel from './GrafanaPanel';

// // Example interfaces (adjust to suit your actual data shape)
// interface Metrix {
//   meric: string;            // e.g., "some/metric/string"
//   containerName?: string;   // optional container name field
//   // add other fields as needed
// }

// interface Datasource {
//   // define relevant fields for your datasource object, e.g., name, type, url, etc.
// }

// interface DashboardPanel {
//   // define the structure of a dashboard panel as returned by createGrafanaPanelObject if needed
//   // e.g., id?: number; title?: string; type?: string; targets?: any[];
// }

// export async function createGrafanaDashboard(
//   metrix: Metrix,
//   datasource: Datasource,
// ): Promise<void> {

//   // Create the dashboard payload
//   const dashboard = {
//     dashboard: {
//       id: null,
//       uid: metrix.meric.replace(/.*\/.*\//g, ''),
//       title: metrix.meric.replace(/.*\/.*\//g, ''),
//       tags: ['templated'],
//       timezone: 'browser',
//       schemaVersion: 16,
//       version: 0,
//       refresh: '10s',
//       panels: [] as DashboardPanel[],
//     },
//     folderId: 0,
//     overwrite: true,
//   };

//   // Use the createGrafanaPanelObject function from the imported GrafanaPanel object.
//   const panel = GrafanaPanel.createGrafanaPanelObject(metrix, datasource);
//   dashboard.dashboard.panels.push(panel);

//   try {
//     // POST request to Grafana Dashboard API to create/update a dashboard
//     const dashboardResponse = await axios.post(
//       'http://localhost:32000/api/dashboards/db',
//       JSON.stringify(dashboard),
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer glsa_pITqM0BIfNHNKL4PsXJqmTYQl0D9QGxF_486f63e1',
//         },
//       },
//     );

//     // Check the response status (axios throws on error responses by default)
//     if (dashboardResponse.status >= 400) {
//       console.error('Error with POST request to Grafana Dashboards API.');
//     } else {
//       if (metrix.containerName) {
//         console.log(`📊 Grafana graphs for the "${metrix.containerName}" container are ready!`);
//       } else {
//         console.log('📊 Grafana graphs are ready!');
//       }
//     }
//   } catch (err) {
//     console.error('Error creating Grafana dashboard:', err);
//   }
// }
import axios from 'axios';
// Import the default export from GrafanaPanel.ts as an object.
import { createGrafanaPanelObject } from '../controllers/GrafanaPanel';

// Example interfaces (adjust to suit your actual data shape)
interface Metrix {
  meric: string;            // e.g., "some/metric/string"
  containerName?: string;   // optional container name field
  // add other fields as needed
}

interface Datasource {
  // define relevant fields for your datasource object, e.g., name, type, url, etc.
}

interface DashboardPanel {
  // define the structure of a dashboard panel as returned by createGrafanaPanelObject if needed
  // e.g., id?: number; title?: string; type?: string; targets?: any[];
}

export async function createGrafanaDashboard(
  metrix: Metrix,
  datasource: Datasource,
): Promise<void> {

  // Create the dashboard payload
  const dashboard = {
    dashboard: {
      id: null,
      uid: metrix.meric.replace(/.*\/.*\//g, ''),
      title: metrix.meric.replace(/.*\/.*\//g, ''),
      tags: ['templated'],
      timezone: 'browser',
      schemaVersion: 16,
      version: 0,
      refresh: '10s',
      panels: [] as DashboardPanel[],
    },
    folderId: 0,
    overwrite: true,
  };

  // Use the createGrafanaPanelObject function from the imported GrafanaPanel object.
  // With the updated signature, the third parameter is optional.
  const panel = createGrafanaPanelObject(metrix, datasource);
  dashboard.dashboard.panels.push(panel);

  try {
    // POST request to Grafana Dashboard API to create/update a dashboard
    const dashboardResponse = await axios.post(
      'http://localhost:32000/api/dashboards/db',
      JSON.stringify(dashboard),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer glsa_pITqM0BIfNHNKL4PsXJqmTYQl0D9QGxF_486f63e1',
        },
      },
    );

    // Check the response status (axios throws on error responses by default)
    if (dashboardResponse.status >= 400) {
      console.error('Error with POST request to Grafana Dashboards API.');
    } else {
      if (metrix.containerName) {
        console.log(`📊 Grafana graphs for the "${metrix.containerName}" container are ready!`);
      } else {
        console.log('📊 Grafana graphs are ready!');
      }
    }
  } catch (err) {
    console.error('Error creating Grafana dashboard:', err);
  }
}
