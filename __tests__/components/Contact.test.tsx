import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../app/components/Contact';
import DashboardContextProvider from '../../app/context/DashboardContext';

describe('Contact Page', () => {
  let element;
  beforeAll(() => {
    render(
      <DashboardContextProvider>
        <Contact />
      </DashboardContextProvider>
    );
    element = screen.getByTestId('contactPage');
  });

  it('Should have two p tags', () => {
    expect(element.querySelectorAll('p').length).toBe(2);
  });

  it('Should have a form', () => {
    expect(element.querySelectorAll('form').length).toBe(1);
  });

  it('Should have six labels', () => {
    expect(element.querySelectorAll('label').length).toBe(6);
  });

  it('Should have one h1 tags', () => {
    expect(element.querySelectorAll('h1').length).toBe(1);
  });

  it('Should have three divs', () => {
    expect(element.querySelectorAll('div').length).toBe(3);
  });

  it('Should have have two inputs', () => {
    expect(element.querySelectorAll('input').length).toBe(6);
  });
});
