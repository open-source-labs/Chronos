import React from 'react';

const ServicesDescription = (props) => {
  const { URI, handleChange, name, description } = props;
  return (
    <>
      <div>
          <label htmlFor="db-uri">
            URI<span>*</span>
          </label>
          <input
            id="db-uri"
            name="URI"
            value={URI}
            onChange={e => handleChange(e)}
            placeholder="Database URI"
            required
          />
        </div>
        <div>
          <label htmlFor="db-name">
            Name<span>*</span>
          </label>
          <input
            id="db-name"
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
    </>
  )
}

export default ServicesDescription;