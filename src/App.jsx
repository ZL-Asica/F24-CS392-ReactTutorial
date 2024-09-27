import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main';

const queryClient = new QueryClient();
const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main url={url} />
    </div>
  </QueryClientProvider>
);

export default App;
