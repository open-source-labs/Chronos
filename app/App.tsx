import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';
import './stylesheets/scrollBar.scss';
import { useQuery, QueryClient, useQueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const App: React.FC = React.memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Splash />
      <DashboardContainer />
    </QueryClientProvider>

  )
});

export default App;
