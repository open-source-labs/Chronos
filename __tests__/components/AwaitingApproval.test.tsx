import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AwaitingApproval from '../../app/components/AwaitingApproval';
import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  // ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
  useHistory: () => ({ push: jest.fn() }), // ({ push: jest.fn() })
}));

describe('Awaiting Approval Page', () => {
  beforeEach(() => {
    render(<AwaitingApproval />);
  });

  it('Should have awaiting approval message', () => {
    const element = screen.getByTestId('awaitingApprovalMessage');
    expect(element).toMatchInlineSnapshot(`
    <p
      class="welcomeMessage"
      data-testid="awaitingApprovalMessage"
    >
      Your account is awaiting approval. Please contact your administrator if you have any questions.
    </p>
    `);
  });

  it('Should have return button', () => {
    const returnBtn = screen.getByRole('button');
    expect(returnBtn).toHaveTextContent('Return');
  });

  it('Should perform re-route on button click', () => {
    const returnBtn = screen.getByRole('button');
    expect(fireEvent.click(returnBtn)).toBeTruthy();
    expect(typeof returnBtn.onclick).toBe('function');
  });
});
