import Image from 'next/image';
import { Link } from '@/components/link';
import { fetchDribbbleShot } from '@/lib/dribbble';
import type { ReactElement } from 'react';

const Dribbble = async ({ shot }: { shot: number }): Promise<ReactElement> => {
  try {
    const data = await fetchDribbbleShot(shot);

    return (
      <div className="not-prose">
        {data.image ? (
          <Image
            alt=""
            src={data.image}
            width={800}
            height={600}
            className="w-full aspect-[4/3]"
            quality={100}
          />
        ) : null}
        <p>{data.title}</p>
        <p>{data.url}</p>
      </div>
    );
  } catch (error) {
    return <Link href={`https://dribbble.com/shots/${shot}`}>View shot</Link>;
  }
};

export default Dribbble;
