import React, { useState, useContext, useEffect } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useParams } from 'react-router-dom';
import { QueryContext } from '../context/QueryContext';
import { HealthContext } from '../context/HealthContext';
import { EventContext } from '../context/EventContext';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid/components';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from './Styling';

import { Button, TextField } from '@mui/material';


interface Params {
  service: string;
}

const TransferColumns = React.memo(() => {
  const [targetKeys, setTargetKeys] = useState<any[]>([]);
  // console.log({targetKeys})
  const [metricsPool, setMetricsPool] = useState<any[]>([]);
  // console.log({metricsPool})
  const [healthMetricsReady, setHealthMetricsReady] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);
  const [eventMetricsReady, setEventMetricsReady] = useState(false);
  const [eventMetrics, setEventMetrics] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const { setSelectedMetrics } = useContext(QueryContext);
  const { healthData } = useContext(HealthContext);
  const { eventData } = useContext(EventContext);
  const { service } = useParams<keyof Params>() as Params;
  const { mode } = useContext(DashboardContext.DashboardContext);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { savedMetrics } = useContext(ApplicationContext)

  const currentMode = mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;
  const currentStyle = mode === 'light' ? lightAndDark.lightModeData : lightAndDark.darkModeData;

  useEffect(() => {
    if (healthData) {
      console.log({healthData})
      setHealthMetricsReady(true);
    }
  }, [healthData]);

  useEffect(() => {
    if (eventData) {
      setEventMetricsReady(true);
    }
  }, [eventData]);

  useEffect(() => {
    setHealthMetrics(getMetrics('health', healthData));
  }, [healthMetricsReady]);

  useEffect(() => {
    setEventMetrics(getMetrics('event', eventData));
  }, [eventMetricsReady]);

  useEffect(() => {
    if (service === '') {
      return;
    }
    if (service === 'kafkametrics') {
      if (eventData) {
        setMetricsPool(getMetrics('event', eventData));
      } else if (eventMetricsReady) {
        setMetricsPool(eventMetrics);
      }
    }
    // JJ-ADDITION (CAN ALSO JUST ADD OR OPERATOR TO ABOVE CONDITIONAL)
    else if (service === 'kubernetesmetrics') {
      if (eventData) {
        setMetricsPool(getMetrics('event', eventData));
      } else if (eventMetricsReady) {
        setMetricsPool(eventMetrics);
      }
    } else if (!service.includes('kafkametrics')) {
      if (healthData) {
        setMetricsPool(getMetrics('health', healthData));
      } else if (healthMetricsReady) {
        setMetricsPool(healthMetrics);
      }
    } else {
      if (healthData && eventData) {
        setMetricsPool(getMetrics('event', eventData).concat(getMetrics('health', healthData)));
      } else if (healthMetricsReady && eventMetricsReady) {
        setMetricsPool(eventMetrics.concat(healthMetrics));
      }
    }
  }, [service, eventData, healthData]);

  // responsible for parsing data and updating state via setMetricsPool
  const getMetrics = (type, dataObject) => {
    let pool: any[] = [];
    if (type === 'event') {
      for (const category in dataObject) {
        const metricsObjects = dataObject[category];
        for (const metricName in metricsObjects) {
          const key = category + ' | ' + metricName;
          pool.push({
            key: key,
            title: key,
            tag: category,
          });
        }
      }
    } else {
      // iterate throughout the healthData object to populate the `Metrics Query` tab with metrics options
      // The pool array wants an object with a specific format in order to populate the selection table
      for (const service in dataObject) {
        const categoryObjects = dataObject[service];
        for (const category in categoryObjects) {
          const metricsObjects = categoryObjects[category];
          for (const metricName in metricsObjects) {
            const key = category + ' | ' + metricName;
            pool.push({
              key: key,
              title: key,
              tag: category,
            });
          }
        }
      }
    }
    return pool;
  };

  const createSelectedMetricsList = () => {

    const temp: any[] = [];
    const categorySet = new Set();

    for (let i = 0; i < targetKeys.length; i++) {
      const str: string = targetKeys[i];
      const strArr: string[] = str.split(' | ');
      const categoryName = strArr[0];
      const metricName = strArr[1];
      if (categorySet.has(categoryName)) {
        temp.forEach(element => {
          if (Object.keys(element)[0] === categoryName) {
            const metricsList: any[] = element[categoryName];
            metricsList.push(metricName);
          }
        });
      } else {
        categorySet.add(categoryName);
        const newCategory = {};
        newCategory[categoryName] = [metricName];
        temp.push(newCategory);
      }
    }
    // console.log('temp', temp)
    setSelectedMetrics(temp);
  };

  // makes the column titles for the selection grid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'style',},
    {
      field: 'tag',
      headerName: 'Category',
      flex: 1,
      editable: true,
      headerClassName: 'style',
    },
    {
      field: 'title',
      headerName: 'Metric',
      flex: 3,
      editable: true,
      headerClassName: 'style',
    },
  ];

  // makes the rows needed for the selection grid
  const rows:any[] = []
  let id = 0
  for(let savedMetric of Object.keys(savedMetrics)) {
   
    const { metric,category } = savedMetrics[savedMetric]
    rows.push({
      id:id++,
      tag:category,
      title:metric
    })
  }

  // makes the Printed list of 'currently selected rows' on the page using targetKeys array
  const selectedRows: any[] = [];
  targetKeys.forEach(el => {
    selectedRows.push(
      <li 
        style={{ 
          marginLeft: '30px', 
          marginTop: '5px', 
          color: currentMode.color 
          }}
      >
        {el}
      </li>
    );
  });

  //! BZ: creates metrics query page in Chronos

  return (
    <>
      <div id="getChartsContainer">
        <Button
          id="getCharts"
          onClick={createSelectedMetricsList}
          variant="contained"
          color="primary"
        >
          Get Charts
        </Button>
      </div>
      <div id="transferTest">
        <div style={{ height: '500px', width: '100%' }}>
        
          <DataGrid
            // style={currentStyle }
            rows={rows}
            columns={columns}
            style={currentStyle}
            slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            pageSizeOptions ={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={metricIndeces => {
              const metrics: any[] = [];
              metricIndeces.forEach(el => {
                console.log({rows})
                metrics.push(`${rows[el].tag} | ${rows[el].title}`);
              });
              setTargetKeys(metrics);
            }}
            
          />
          
        </div>
        {selectedRows.length > 0 && (
          <h3 
            style={{ 
              marginTop: '20px', 
              color: 'currentStyle'
            }}
          >
            Selected Rows:
          </h3>
        )}
        <ol 
          id="selectedRows"
        >
            {selectedRows}
        </ol>
      </div>
    </>
  );
});

export default TransferColumns;
