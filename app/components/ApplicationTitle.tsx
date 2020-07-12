import React from 'react'

export interface ApplicationTitleProps {
  app: string;
  service: string
}
 
const ApplicationTitle: React.SFC<ApplicationTitleProps> = ({ app, service }) => {
  return ( 
    <div>
      <h1>This is the applications title</h1>
    </div>
   );
}
 
export default ApplicationTitle;