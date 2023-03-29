/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useCallback } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AwsModal.scss';

interface AwsFields {
  typeOfService: string;
  instance: string;
  region: string;
  accessKey: string;
  secretAccessKey: string;
  name: string;
  description?: string;
  awsUrl ?: string;
}

interface IDashboard {
  addAwsApp: (fields: AwsFields) => void;
}

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AwsModal: React.FC<AddModalProps> = React.memo(({ setOpen }) => {
  const { addAwsApp }: IDashboard = useContext(DashboardContext);

  const [awsFields, setAwsFields] = useState<AwsFields>({
    typeOfService: 'AWS/EC2',
    instance: '',
    region: 'us-east-1',
    accessKey: '',
    secretAccessKey: '',
    name: '',
    awsUrl: '',
    description: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addAwsApp(awsFields);
    setOpen(false); // Close modal on submit
  };

  // Handle form changes
  const handleChange = (event: InputElement) => {
    const { name, value } = event.target;
    setAwsFields({
      ...awsFields,
      [name]: value,
    });
  };

  const { typeOfService, instance, region, accessKey, secretAccessKey, name, description, awsUrl } =
    awsFields;

  return (
    <div className="add-container">
      <div className="add-header">
        <h2>Add an AWS Application</h2>
        <p>Enter the AWS information used to track the service</p>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Required*</p>
        <div>
          <label htmlFor="serv-type">Type of Service</label>
          <select
            id="serv-type"
            name="typeOfService"
            value={typeOfService}
            onChange={e => handleChange(e)}
          >
            <option value="AWS/EC2">Elastic Compute Cloud (EC2)</option>
            <option value="AWS/ECS">Elastic Container Service (ECS)</option>
            <option value="AWS/EKS">Elastic Kubernetes Service (EKS)</option>
          </select>
        </div>
        {typeOfService === 'AWS/EC2' && (
          <div>
            <label htmlFor="instance">
              AWS Instance ID<span>*</span>
            </label>
            <input
              id="aws-instance"
              name="instance"
              value={instance}
              onChange={e => handleChange(e)}
              placeholder="AWS Instance ID"
              required
            />
          </div>
        )}
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
        <div>
          <label htmlFor="aws-access-key">
            Access Key<span>*</span>
          </label>
          <input
            id="aws-access-key"
            type="password"
            name="accessKey"
            value={accessKey}
            onChange={e => handleChange(e)}
            placeholder="AWS Access Key"
            required
          />
        </div>
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
        <div>
          <label htmlFor="aws-url">
            Cluster URL<span>*</span>
          </label>
          <input
            id="aws-url"
            type="string"
            name="awsUrl"
            value={awsUrl}
            onChange={e => handleChange(e)}
            placeholder="AWS Url"
            required
          />
        </div>
        <div>
          <label htmlFor="aws-name">
            Name<span>*</span>
          </label>
          <input
            id="aws-name"
            type="text"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            placeholder="Add a name for your new service"
            required
          />
        </div>
        <div>
          <label htmlFor="db-desc">Description</label>
          <textarea
            id="db-desc"
            name="description"
            value={description}
            onChange={e => handleChange(e)}
            placeholder="Add a short description"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
});

export default AwsModal;
