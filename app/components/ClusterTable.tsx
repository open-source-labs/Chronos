import React, { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AwsContext } from '../context/AwsContext';
import cluster from 'cluster';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: '0 20px',
  },
  activeCell: {
    color: 'green',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    fontSize: '1.2rem',
  },
  title: {
    color: '#888888',
  },
});

export interface ClusterTableProps {
  typeOfService: string;
  region: string;
}

const ClusterTable: React.FC<ClusterTableProps> = React.memo(({ region }) => {
  const classes = useStyles();
  const { awsEcsData } = useContext(AwsContext);
  // const {clusterName, servicesNum, tasksNum, status} = useContext(DashboardContext);

  return (
    <div className="ClusterTable-container">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="cluster table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>Name</TableCell>
              <TableCell className={classes.title}>Status</TableCell>
              <TableCell className={classes.title}>Services</TableCell>
              <TableCell className={classes.title}>Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell className={classes.body}>
              <div className={classes.column}>
                <div>{awsEcsData ? awsEcsData.clusterInfo?.clusterName : 'Loading...'}</div>
                <div>
                  <span className="region">{region}</span>
                </div>
              </div>
            </TableCell>
            {/* <TableCell className={cluster.status === 'active' ? classes.activeCell : undefined}>testactive</TableCell> */}
            <TableCell className={classes.body}>active</TableCell>
            <TableCell className={classes.body}>3</TableCell>
            <TableCell className={classes.body}>0/3</TableCell>

            {/* {clusters.map((cluster: Cluster, index: number) => (
            <TableRow key={index}>
              <TableCell>{cluster.name}</TableCell>
              <TableCell>{cluster.status}</TableCell>
              <TableCell>{cluster.serviceCount}</TableCell>
              <TableCell>{cluster.taskCount}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default ClusterTable;

// type Cluster = {
//   name: string;
//   status: string;
//   serviceCount: number;
//   taskCount: number;
// };

// function ClusterTable() {
//   const [clusters, setClusters] = useState<Cluster[]>([]);
//   const classes = useStyles();

//   useEffect(() => {
//     // Fetch cluster data using the AWS SDK and set the state
//     const ecs = new AWS.ECS();
//     ecs.listClusters({}, (err: Error, data: AWS.ECS.ListClustersResponse) => {
//       if (err) {
//         console.log(err, err.stack);
//       } else {
//         const clusterArns = data.clusterArns;
//         const clusterPromises = clusterArns?.map(clusterArn => ecs.describeClusters({ clusters: [clusterArn] }).promise());
//         Promise.all(clusterPromises).then(clusterData => {
//           const clusters = clusterData.map(cluster => {
//             const { clusterName, status, registeredContainerInstancesCount, runningTasksCount } = cluster?.clusters[0];
//             return {
//               name: clusterName,
//               status,
//               serviceCount: registeredContainerInstancesCount,
//               taskCount: runningTasksCount
//             };
//           });
//           setClusters(clusters);
//         }).catch(err => {
//           console.log(err, err.stack);
//         });
//       }
//     });
//   }, []);
