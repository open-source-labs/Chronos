import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Settings from '../../app/components/Settings';
import { DashboardContext } from '../../app/context/DashboardContext';
import '@testing-library/jest-dom';

describe('Settings', () => {
  let changeMode = jest.fn();

  beforeEach(() => {
    render(
      <DashboardContext.Provider value={{ changeMode }}>
        <Settings />
      </DashboardContext.Provider>
    );
  });

  test('Should change mode to light mode on light button click', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Light' }));
    expect(changeMode).toHaveBeenCalledWith('light');
  });

  test('Should change mode to dark mode on dark button click', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Dark' }));
    expect(changeMode).toHaveBeenCalledWith('dark');
  });
});
