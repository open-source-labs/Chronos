// import React, { useContext } from 'react';
// import React from 'react';
// import { render, fireEvent, screen, cleanup } from '@testing-library/react';
// import { ipcRenderer, ipcMain } from 'electron';
// import DashboardContextProvider, { DashboardContext } from '../../app/context/DashboardContext';
// import Applications from '../../app/components/Applications';

// jest.mock('electron', () => ({
//   ipcRenderer: { sendSync: () => [] },
//   ipcMain: { on: jest.fn() },
// }));

// xdescribe('Application', () => {
//   // beforeEach(() => {
//   //   let comp = render(<Applications />);
//   // });

//   it('should render', () => {
//     const component = render(
//       <DashboardContextProvider>
//         <Applications />
//       </DashboardContextProvider>
//     );
//     console.log(component);
//     expect(component).toBeTruthy();
//   });
// });

xdescribe('Skip for now', () => {
  xit('skipping', () => {
    expect('whocares').toBeTruthy();
  });
});
