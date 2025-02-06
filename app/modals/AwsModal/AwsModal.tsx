/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useCallback } from 'react';
import { DashboardContext } from '../../context/DashboardContext';


import { TModalSetter } from '../../components/Occupied/types/Occupied';
import AwsServiceInstance from './AwsServiceInstance';
import AwsRegion from './AwsRegion';
import AwsKeyUrl from './AwsKeyUrl';
import AwsDescription from './AwsDescription';
import './AwsModal.scss';
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

// interface AddModalProps {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AwsModal: React.FC<TModalSetter> = React.memo(({ setModal }) => {
  const { addAwsApp }: IDashboard = useContext(DashboardContext);

  // instance is instanceID
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
    setModal({isOpen:false,type:''})
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
        <AwsServiceInstance typeOfService={typeOfService} handleChange={handleChange} instance={instance} />
        <AwsRegion region={region} handleChange={handleChange} />
        <AwsKeyUrl typeOfService={typeOfService} accessKey={accessKey} handleChange={handleChange} secretAccessKey={secretAccessKey} awsUrl={awsUrl}/>
        <AwsDescription handleChange={handleChange} description={description} name={name}/>
        <button>Submit</button>
      </form>
    </div>
  );
});

export default AwsModal;
