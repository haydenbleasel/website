export type ProductHuntResponse = {
  data: {
    user: {
      madePosts: {
        edges: {
          node: {
            id: string;
            name: string;
            commentsCount: number;
            createdAt: string;
            featuredAt?: string;
            slug: string;
            tagline: string;
            votesCount: number;
            website: string;
          };
        }[];
      };
    };
  };
};

const query = `
    query {
      user(id: "106725") {
        madePosts {
          edges {
            node {
              id,
              name,
              commentsCount,
              createdAt,
              featuredAt,
              slug,
              tagline,
              votesCount,
              website
            }
          }
        }
      }
    }
  `;

export const fetchProducts = async (): Promise<
  ProductHuntResponse['data']['user']['madePosts']['edges'][0]['node'][]
> => {
  const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PRODUCTHUNT_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Query failed with status code: ${response.status}`);
  }

  const json = (await response.json()) as ProductHuntResponse;

  return json.data.user.madePosts.edges.map((edge) => edge.node);
};
