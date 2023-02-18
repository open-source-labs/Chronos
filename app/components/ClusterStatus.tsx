import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {AwsContext} from '../context/AwsContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface ClusterTableProps {
  region: string;
}

const ClusterTable: React.FC<ClusterTableProps> = React.memo(({region}) => {
  const classes = useStyles();
  // const {clusterName, servicesNum, tasksNum, status} = useContext(DashboardContext);

    return (
        <div className="ClusterTable-container">
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="cluster table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Services</TableCell>
            <TableCell>Tasks</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {clusters.map((cluster: Cluster, index: number) => (
            <TableRow key={index}>
              <TableCell>{cluster.name}</TableCell>
              <TableCell>{cluster.status}</TableCell>
              <TableCell>{cluster.serviceCount}</TableCell>
              <TableCell>{cluster.taskCount}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
        </div>
    )
})

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

