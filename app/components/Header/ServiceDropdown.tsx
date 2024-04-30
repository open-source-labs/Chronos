import React from 'react';

const ServiceDropdown = ({ servicesData, selectedServices, setSelectedServices, isOpen, toggleDropdown }) => {
  const handleCheckbox = (e) => {
    const service = e.target.value;
    if (e.target.checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s !== service));
    }
  };

  return (
    <div className={isOpen ? 'dropdown active' : 'dropdown'}>
      <div className={isOpen ? 'select disabled' : 'select'} onClick={toggleDropdown}>
        Select Services
      </div>
      {isOpen && (
        <div className="services">
          {servicesData.map(service => (
            <label key={service.microservice} className="select">
              {service.microservice}
              <input
                type="checkbox"
                value={service.microservice}
                checked={selectedServices.includes(service.microservice)}
                onChange={handleCheckbox}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDropdown;