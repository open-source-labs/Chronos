import React from 'react';

const EKSGraphsComponent = ({ awsEksData }) => (
  <iframe src={`${awsEksData}?orgId=1&refresh=10s&theme=light&kiosk`} width="1300" height="1300"></iframe>
);

export default EKSGraphsComponent;