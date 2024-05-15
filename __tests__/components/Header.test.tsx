/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '../../app/components/Header/Header';
import ServiceDropdown from '../../app/components/Header/ServiceDropdown';
import { DashboardContext } from '../../app/context/DashboardContext';
import { ApplicationContext } from '../../app/context/ApplicationContext';
import { HashRouter as Router } from 'react-router-dom';
import mockData from '../mock_data.json';
import '@testing-library/jest-dom';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockData,
  },
}));
describe('Speed Chart', () => {
  const props = {
    app: 'Test DB',
    service: 'Test Service',
    setLive: jest.fn(),
    live: 'false',
  };
  let element;
  beforeEach(() => {
    // const mockData = [
    //   { microservice1: 'Test 1'},
    //   { microservice2: 'Test 2'},
    // ]
    render(
      <Router>
        <ApplicationContext.Provider value={{ servicesData: '' }}>
          <DashboardContext.Provider value={{ mode: 'light' }}>
            <Header app={['Test DB']} service="Test Service" setLive={jest.fn()} live={false} />
          </DashboardContext.Provider>
        </ApplicationContext.Provider>
      </Router>
    );
    element = screen.getByTestId('Header');
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should have an h1, no input, and one button', () => {
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('input').length).toBe(0);
    expect(element.querySelectorAll('button').length).toBe(1);
  });

  it('Button should have an onClick function', () => {
    expect(typeof element.querySelector('button').onclick).toBe('function');
  });

  // trying to test the functionality of component not passed as props
  // it('Should check/uncheck the checkbox when clicking services', () => {
  //   const checkBox = screen.getByTestId('checkbox');
  //   fireEvent.click(checkBox);
  //   expect(checkBox.parentElement).toHaveClass('selected');
  //   fireEvent.click(checkBox);
  //   expect(checkBox.parentElement).not.toHaveClass('selected');
  // });

  it('Should also change selectModal to true or false', () => {});
});

describe('ServiceDropdown test', () => {
  it('opens and closes ServiceDropdown component on click', () => {
    const servicesData = [
      { microservice: 'inventory' },
      { microservice: 'orders' },
      { microservice: 'auth' }
    ];
  
    // Define initial selected services state
    const selectedServices = [];
    
    // Define a mock toggleDropdown function
    const toggleDropdown = jest.fn();

      // Render the ServiceDropdown component
    render(
    <ServiceDropdown
      servicesData={servicesData}
      selectedServices={selectedServices}
      setSelectedServices={jest.fn()} // Mock setSelectedServices function
      isOpen={false} // Assuming dropdown is closed initially
      toggleDropdown={toggleDropdown}
    />
    );
    
    // Assert that dropdown is initially closed
    expect(screen.queryByText('inventory')).not.toBeInTheDocument();

    // simulate click event on button within ServiceDropdown component
    const selectButton = screen.getByTestId('ssButton');
    fireEvent.click(selectButton);

    // expect the toggleDropdown function to have been called
    expect(toggleDropdown).toHaveBeenCalled();
    
    // Assert that dropdown is now open by checking that service is rendered
    // expect(screen.getByText('inventory')).toBeInTheDocument();

    // // Simulate click event to close the dropdown
    // fireEvent.click(selectButton);

    // // Assert that dropdown is now closed by checking that service is no longer rendered
    // expect(screen.getByText('inventory')).not.toBeInTheDocument();
  });
});
