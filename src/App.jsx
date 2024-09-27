import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const [schedule, isLoading, error] = useJsonQuery(url);

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!schedule) return <h1>No course data found</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
