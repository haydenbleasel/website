/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import parseError from '@/lib/parseError';

export const config = {
  runtime: 'experimental-edge',
};

const createString = (str: string | null, fallback: string): string => {
  if (!str) {
    return fallback;
  }

  if (str.length > 100) {
    return `${str.slice(0, 100)}...`;
  }

  return str;
};

const handler = async (req: NextRequest): Promise<ImageResponse> => {
  const { searchParams } = new URL(req.url);
  const InterRegular = await fetch(
    new URL('./Inter-Regular.otf', import.meta.url)
  ).then(async (res) => res.arrayBuffer());
  const InterBold = await fetch(
    new URL('./Inter-Bold.otf', import.meta.url)
  ).then(async (res) => res.arrayBuffer());

  const avatarUrl = new URL(
    'avatar.jpg',
    process.env.NEXT_PUBLIC_SITE_URL ?? ''
  ).href;
  const title = createString(searchParams.get('title'), 'Hayden Bleasel');
  const description = createString(
    searchParams.get('description'),
    'Digital Product Designer and Software Engineer'
  );
  const path = createString(searchParams.get('path'), '/');
  const { hostname } = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '');
  const url = `${hostname}${path}`;

  try {
    return new ImageResponse(
      (
        <div tw="flex bg-zinc-50 flex-1 w-full h-full justify-center flex-col py-12 px-32">
          <img
            width={64}
            height={64}
            src={avatarUrl}
            tw="rounded-full w-16 h-16 mb-12 block"
            alt=""
          />
          <p tw="text-5xl tracking-tight leading-[1.1] font-bold mt-0 mb-6 w-[70%] text-zinc-900">
            {title}
          </p>
          <p tw="text-2xl mt-0 mb-8 w-[70%] text-zinc-600">{description}</p>
          <p tw="text-md m-0 text-zinc-500 w-[70%]">{url}</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: InterRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: InterBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    const message = parseError(error);

    return new Response(`Failed to generate the image: ${message}`, {
      status: 500,
    });
  }
};

export default handler;
