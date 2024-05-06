import React from 'react';
import ClusterTable from '../../components/ClusterTable';
import AwsECSClusterGraphs from '../../components/AwsECSClusterGraphs';

const ECSGraphsComponent = ({ region, typeOfService }) => (
  <div className="cluster-table">
    <ClusterTable typeOfService={typeOfService} region={region} />
    <AwsECSClusterGraphs />
  </div>
);

export default ECSGraphsComponent;