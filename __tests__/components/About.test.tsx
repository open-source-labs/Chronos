import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../app/components/About';
import DashboardContextProvider from '../../app/context/DashboardContext';

describe('About Page', () => {
  let element;
  beforeAll(() => {
    render(
      <DashboardContextProvider>
        <About />
      </DashboardContextProvider>
    );
    element = screen.getByTestId('aboutPage');
  });

  it('Should have three p tags', () => {
    expect(element.querySelectorAll('p').length).toBe(3);
  });

  it('Should have three h3 tags', () => {
    expect(element.querySelectorAll('h3').length).toBe(3);
  });

  it('Should have one div', () => {
    expect(element.querySelectorAll('div').length).toBe(1);
  });
});
