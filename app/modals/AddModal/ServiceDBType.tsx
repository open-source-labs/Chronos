import React from 'react';


const ServiceDBType = (props) => {
  return (
    <>
      <div>
          <label htmlFor="serv-type">
            Type of Service<span>*</span>
          </label>
          <select
            id="serv-type"
            name="typeOfService"
            value={props.typeOfService}
            onChange={e => props.handleChange(e)}
          >
            <option value="Docker">Docker</option>
            <option value="gRPC">gRPC</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="Microservices">Microservices</option>
          </select>
        </div>
        <div>
          <label htmlFor="db-type">
            Type of Database<span>*</span>
          </label>
          <select id="db-type" name="database" value={props.database} onChange={e => props.handleChange(e)}>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>
    </>
  )
}

export default ServiceDBType;