import React from 'react';

const AwsServiceInstance = (props) => {
  return (
    <>
      <div>
        <label htmlFor="serv-type">Type of Service</label>
        <select
          id="serv-type"
          name="typeOfService"
          value={props.typeOfService}
          onChange={e => props.handleChange(e)}
        >
          <option value="AWS/EC2">Elastic Compute Cloud (EC2)</option>
          <option value="AWS/ECS">Elastic Container Service (ECS)</option>
          <option value="AWS/EKS">Elastic Kubernetes Service (EKS)</option>
        </select>
      </div>
      {props.typeOfService === 'AWS/EC2' && (
        <div>
          <label htmlFor="instance">
            AWS Instance ID<span>*</span>
          </label>
          <input
            id="aws-instance"
            name="instance"
            value={props.instance}
            onChange={e => props.handleChange(e)}
            placeholder="AWS Instance ID"
            required
          />
        </div>
        )}
    </>
  )
}

export default AwsServiceInstance;