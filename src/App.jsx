import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main/>
    </div>
  </QueryClientProvider>
);

export default App;
