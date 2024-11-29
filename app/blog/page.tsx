import { Pump } from 'basehub/react-pump';

const Blog = () => (
  <Pump queries={[{ __typename: true }]}>
    {([data]) => {
      'use server';
      return <>{JSON.stringify(data, null, 2)}</>;
    }}
  </Pump>
);

export default Blog;
