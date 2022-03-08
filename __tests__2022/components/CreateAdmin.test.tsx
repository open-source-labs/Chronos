import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAdmin from '../../app/components/CreateAdmin';
import DashboardContextProvider from '../../app/context/DashboardContext';

describe('Create Admin Page', () => {
  let element;
  beforeAll(() => {
    render(
      <DashboardContextProvider>
        <CreateAdmin />
      </DashboardContextProvider>
    );
    element = screen.getByTestId('createAdmin');
  });
});
