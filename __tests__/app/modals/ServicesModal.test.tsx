import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { ApplicationContext } from '../../../app/context/ApplicationContext';
import ServicesModal from '../../../app/modals/ServicesModal';

describe('<ServicesModal />', () => {
  const props = {
    app: 'myApp',
    i: 1,
  };

  const contextValues: any = {
    fetchServicesNames: jest.fn(),
    connectToDB: jest.fn(),
    setServicesData: jest.fn(),
    servicesData: [],
  };

  describe('Before fetch request for services', () => {
    let wrapper: any;
    beforeAll(() => {
      contextValues.servicesData = [];
      const mockServicesModal = (
        <ApplicationContext.Provider value={{ ...contextValues }}>
          <ServicesModal {...props} />
        </ApplicationContext.Provider>
      );
      wrapper = mount(mockServicesModal);
    });

    it("should display 'Loading...' if services have not yet been fetched", () => {
      expect(wrapper.find('h3').text()).toEqual('Loading...');
    });
  });

  describe('After completed fetch request for services', () => {
    let wrapper: any;
    beforeAll(() => {
      contextValues.servicesData = [
        { microservice: 'books', interval: 2000 },
        { microservice: 'customers', interval: 2000 },
      ];
      const mockServicesModal = (
        <MemoryRouter>
          <ApplicationContext.Provider value={{ ...contextValues }}>
            <ServicesModal {...props} />
          </ApplicationContext.Provider>
        </MemoryRouter>
      );
      wrapper = mount(mockServicesModal);
    });
    it('should display a list of microservice <Link> tags if the fetch request is done', () => {
      expect(wrapper.find('h3').text()).toEqual('Microservices for myApp');
      expect(wrapper.find('Link').length).toBe(2);
    });

    it('should print the correct label for each service', () => {
      const { servicesData } = contextValues;
      wrapper.find('Link').forEach((link: any, i: number) => {
        expect(link.prop('to')).toEqual(`/${servicesData[i].microservice}`);
        expect(link.text()).toEqual(servicesData[i].microservice);
      });
    });
  });
});
