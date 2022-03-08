import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import AwaitingApproval from '../../app/components/AwaitingApproval';

import '@testing-library/jest-dom';

describe('Awaiting Approval Page', () => {
  const { result } = renderHook(() => AwaitingApproval());
  
  it('blah', () => {
    expect(result.current).toBe('function');
  });

  it('Should have awaiting approval message', () => {
    // screen.logTestingPlaygroundURL();
    const element = result.current;
    expect(element).toMatchInlineSnapshot(`
    <p
      class="welcomeMessage"
      data-testid="awaitingApprovalMessage"
    >
      Your account is awaiting approval. Please contact your administrator if you have any questions.
    </p>
    `);
  });
});
// describe('Awaiting Approval Page', () => {
//   beforeEach(() => {
//     render(<AwaitingApproval />);
//   });

//   xit('Should have awaiting approval message', () => {
//     const element = screen.getByTestId('awaitingApprovalMessage');
//     expect(element).toMatchInlineSnapshot(`
//     <p
//       class="welcomeMessage"
//       data-testid="awaitingApprovalMessage"
//     >
//       Your account is awaiting approval. Please contact your administrator if you have any questions.
//     </p>
//     `);
//   });

//   xit('Should have return button', () => {
//     const returnBtn = screen.getByRole('button');
//     expect(returnBtn).toHaveTextContent('Return');
//   });

//   it('Should perform re-route on button click', () => {
//     const returnBtn = screen.getByRole('button');
//     fireEvent.click(returnBtn);
//     screen.logTestingPlaygroundURL();
//     // expect(mockCall).toHaveBeenCalledTimes(1);
//   });
// });


/* render(<AwaitingApproval onClick={mockCall() />})



*/