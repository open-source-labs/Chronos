import axios from 'axios';
// Importing the function that generates Grafana panel objects
import { createGrafanaPanelObject } from '../controllers/GrafanaPanel.js';

//Defined Interfaces to provide type safety 

interface Metric {
  metric: string; // ✅ Represents the metric name in Grafana 
}

interface Datasource {
  type: string; // Defines the type of datasource
  uid: string;  // Unique identifier for the datasource in Grafana
}

/**
 * This function creates a Grafana Dashboard and adds a panel to it.
 * The dashboard then gets stored inside Grafana via an HTTP request.
 * @param metric - The monitoring metric for which we are creating a dashboard
 * @param datasource - The Grafana datasource used for this metric
 */
export async function createGrafanaDashboard(
  metric: Metric,       // Accepts a Metric object as input
  datasource: Datasource // Accepts a Datasource object as input
): Promise<void> {


  const dashboard = {
    dashboard: {
      id: null, // New dashboard (doesn’t exist yet, so ID is null)
      uid: metric.metric.replace(/.*\/.*\//g, ''), //accesses unique identifier from the metric
      title: metric.metric.replace(/.*\/.*\//g, ''), // Title of the dashboard (same as metric name)
      tags: ['templated'], //  Tags help categorize dashboards
      timezone: 'browser', // Uses the local browser’s timezone
      schemaVersion: 16, //  Grafana’s API version 
      version: 0, //  Initial version
      refresh: '10s', //  Auto-refresh every 10 seconds
      panels: [] as any[], // Array to hold panels (empty initially)
    },
    folderId: 0, //  Stores the dashboard in the root folder
    overwrite: true, // Allows overwriting if a dashboard with the same UID exists
  };

  //  Creates and adds a panel to the Dashboard
  const panel = createGrafanaPanelObject(metric, datasource); // generates a panel using the imported function
  dashboard.dashboard.panels.push(panel); //  Add the generated panel to the dashboard

  try {
    // Sends a POST request to Grafana to create/update the dashboard
    const dashboardResponse = await axios.post(
      'http://localhost:32000/api/dashboards/db', // Grafana API endpoint for dashboards
      JSON.stringify(dashboard), 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer glsa_pITqM0BIfNHNKL4PsXJqmTYQl0D9QGxF_486f63e1', // Grafana API Key 
        },
      },
    );

    //  Error Handler
    if (dashboardResponse.status >= 400) {
      console.error('⚠️ Error creating Grafana Dashboard: Check API or JSON request.');
    } else {
      console.log(`📊 Grafana dashboard for metric "${metric.metric}" is ready!`);
    }
  } catch (err) {
    console.error('🚨 Error creating Grafana dashboard:', err);
  }
}
