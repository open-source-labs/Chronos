/*
 Creates a new panel object for a Grafana dashboard
  - Takes in a **metric**, **datasource**, and an optional graphType.
  - If no `graphType` is provided, it defaults to `'defaultGraphType'`.
 * 
 * @param metric - Data point or metric to be visualized.
 * @param datasource - The Grafana datasource to fetch data from.
 * @param graphType - *(Optional)* The type of visualization (e.g., 'timeseries', 'gauge').
 * @returns A Grafana panel configuration object.
 */
export function createGrafanaPanelObject(
  metric: any, 
  datasource: any, 
  graphType?: any
) {
  // Sets a default graph type if none is provided
  const resolvedGraphType = graphType || 'defaultGraphType';

  return {
    datasource, // 🔗 Connect this panel to a Grafana datasource
    fieldConfig: {
      defaults: {
        color: { mode: "palette-classic" }, 
        custom: {
          axisCenteredZero: false,
          axisColorMode: "text",
          
        },
      },
      mappings: [], // 
      thresholds: {
        mode: "absolute",
        steps: [
          { color: "green", value: null }, 
          { color: "red", value: 80 }, 
        ],
      },
      min: 0, // 
    },
    graphType: resolvedGraphType, 
    
  };
}

/**
 Updates an existing Grafana panel object
 * - Similar to `createGrafanaPanelObject`, but for **modifying an existing panel**.
 * - Uses an optional **graphType** (defaults to `'updatedGraphType'`).
 * 
 * @param metric - The metric being updated in Grafana.
 * @param datasource - The associated Grafana datasource.
 * @param graphType - *(Optional)* Type of visualization.
 * @returns An updated Grafana panel object.
 */
export function updateGrafanaPanelObject(
  metric: any, 
  datasource: any, 
  graphType?: any
) {
  // Set a default graph type if none is provided
  const resolvedGraphType = graphType || 'updatedGraphType';

  return {
    datasource, // 
    fieldConfig: {
      defaults: {
        color: { mode: "palette-classic" }, 
        custom: {
          
        },
      },
 
    },
    graphType: resolvedGraphType, 
  };
}
