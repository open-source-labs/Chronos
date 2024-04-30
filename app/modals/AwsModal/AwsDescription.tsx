import React from 'react';

const AwsDescription = (props) => {
  return (
    <>
      <div>
        <label htmlFor="aws-name">
          Name<span>*</span>
        </label>
        <input
          id="aws-name"
          type="text"
          name="name"
          value={props.name}
          onChange={e => props.handleChange(e)}
          placeholder="Add a name for your new service"
          required
        />
      </div>
      <div>
        <label htmlFor="db-desc">Description</label>
        <textarea
          id="db-desc"
          name="description"
          value={props.description}
          onChange={e => props.handleChange(e)}
          placeholder="Add a short description"
        />
      </div>
    </>
  )
}

export default AwsDescription;