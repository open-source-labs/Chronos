import React from 'react';

const AwsRegion = (props) => {
  const { region, handleChange } = props;
  return (
    <div>
      <label htmlFor="region">
        Region<span>*</span>
      </label>
      <select
        id="aws-region"
        name="region"
        value={region}
        onChange={e => handleChange(e)}
        placeholder="AWS Region"
        required
      >
        <option value="us-east-1">US East (N. Virginia) / us-east-1</option>
        <option value="us-east-2">US East (Ohio) / us-east-2</option>
        <option value="us-west-1">US West (N.California) / us-west-1</option>
        <option value="us-west-2">US West (Oregon) / us-west-2</option>
        <option value="ap-south-1">Asia Pacific (Mumbai) / ap-south-1</option>
        <option value="ap-northeast-3">Asia Pacific (Osaka) / ap-northeast-3</option>
        <option value="ap-northeast-2">Asia Pacific (Seoul) / ap-northeast-2</option>
        <option value="ap-southeast-1">Asia Pacific (Singapore) / ap-southeast-1</option>
        <option value="ap-southeast-2">Asia Pacific (Sydney) / ap-southeast-2</option>
        <option value="ap-northeast-1">Asia Pacific (Tokyo) / ap-northeast-1</option>
        <option value="ca-central-1">Canada (Central) / ca-central-1</option>
        <option value="eu-central-1">Europe (Frankfurt) / eu-central-1</option>
        <option value="eu-west-1">Europe (Ireland) / eu-west-1</option>
        <option value="eu-west-2">Europe (London) / eu-west-2</option>
        <option value="eu-west-3">Europe (Paris) / eu-west-3</option>
        <option value="eu-north-1">Europe (Stockholm) / eu-north-1</option>
        <option value="sa-east-1">South America (Sao Paulo) / sa-east-1</option>
      </select>
    </div>
  )
}

export default AwsRegion;