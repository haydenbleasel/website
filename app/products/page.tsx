import { CalendarIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import glimpse from 'react-glimpse/server';
import Image from 'next/image';
import { Link } from '@/components/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/container';
import { fetchProducts } from '@/lib/producthunt';
import type { ProductHuntResponse } from '@/lib/producthunt';
import type { ReactElement } from 'react';

const Project = async ({
  data,
}: {
  readonly data: ProductHuntResponse['data']['user']['madePosts']['edges'][0]['node'];
}): Promise<ReactElement> => {
  const { image } = await glimpse(
    `https://www.producthunt.com/products/${data.slug}`
  );

  return (
    <Link
      href={data.website}
      key={data.name}
      className="no-underline hover:-translate-y-1 transition-transform"
    >
      <Card className="not-prose overflow-hidden bg-white dark:bg-zinc-800">
        {image ? (
          <Image src={image} alt="" width={1200} height={600} unoptimized />
        ) : null}
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <ChatBubbleIcon className="w-3 h-3" />
              {data.commentsCount}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              {data.featuredAt}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Code = async (): Promise<ReactElement> => {
  const products = await fetchProducts();

  return (
    <Container wide>
      <h1>Product Launches</h1>
      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => (
          <Project data={product} key={product.id} />
        ))}
      </div>
    </Container>
  );
};

export default Code;
