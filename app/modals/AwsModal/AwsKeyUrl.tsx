import React from 'react';

const AwsKeyUrl = (props) => {
  const { typeOfService, accessKey, handleChange, secretAccessKey, awsUrl } = props;
  return (
    <>
      <div>
        <label htmlFor="aws-access-key">{(props.typeOfService === 'AWS/EKS') ? 'Bearer Token' : 'Access Key'} <span>*</span>
        </label>
        <input
          id="aws-access-key"
          type="password"
          name="accessKey"
          value={accessKey}
          onChange={e => handleChange(e)}
          placeholder={typeOfService === 'AWS/EKS' ? 'Grafana Bearer Token' : 'AWS Access Key'}
          required
        />
      </div>
      {(typeOfService !== 'AWS/EKS') && (
        <div>
        <label htmlFor="aws-secret-access-key">
          Secret Access Key<span>*</span>
        </label>
        <input
          id="aws-secret-access-key"
          type="password"
          name="secretAccessKey"
          value={secretAccessKey}
          onChange={e => handleChange(e)}
          placeholder="AWS Secret Access Key"
          required
        />
      </div>
      )}        
      <div>
        <label htmlFor="aws-url">
          {(typeOfService === 'AWS/EKS') ? 'Grafana URL' : 'Access Key'}<span>*</span>
        </label>
        <input
          id="aws-url"
          type="string"
          name="awsUrl"
          value={awsUrl}
          onChange={e => handleChange(e)}
          placeholder={typeOfService === 'AWS/EKS'? 'Grafana Provided URL': 'AWS Url'}
        />
      </div>
    </>
  )
};

export default AwsKeyUrl;