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
  const { awsEcsData, isLoading } = useContext(AwsContext);

  const activeServices = () => {
    const serviceNames = Object.keys(awsEcsData).slice(1);

    return serviceNames.filter(el => awsEcsData[el].CPUUtilization?.value.length > 0);
  };

  return (
    <div className="ClusterTable-container">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="cluster table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>Cluster Name</TableCell>
              <TableCell className={classes.title}>Status</TableCell>
              <TableCell className={classes.title}>Services</TableCell>
              <TableCell className={classes.title}>Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell className={classes.body}>
              <div className={classes.column}>
                <div>{isLoading ? 'Loading...' : awsEcsData.clusterInfo?.clusterName}</div>
                <div>
                  <span className="region">{region}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className={activeServices().length ? classes.activeCell : undefined}>
              <strong>{activeServices().length ? 'ACTIVE' : 'INACTIVE'}</strong>
            </TableCell>
            <TableCell className={classes.body}>
              {isLoading ? 'Loading...' : Object.keys(awsEcsData).length - 1}
            </TableCell>
            <TableCell className={classes.body}>
              {String(activeServices().length) + '/' + String(Object.keys(awsEcsData).length - 1)}
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default ClusterTable;
