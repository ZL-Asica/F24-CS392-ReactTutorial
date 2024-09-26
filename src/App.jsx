import React from 'react';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const [schedule, isLoading, error] = useJsonQuery(url);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
