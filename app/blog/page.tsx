import { Pump } from 'basehub/react-pump';

const Blog = () => (
  <Pump queries={[{ __typename: true }]}>
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }}
  </Pump>
);

export default Blog;
