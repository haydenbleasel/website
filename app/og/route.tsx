import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const loadGoogleFont = async (font: string, text: string, weights: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
};

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get('title');
  const description = request.nextUrl.searchParams.get('description');

  const avatarData = await readFile(
    join(process.cwd(), 'components/avatar/avatar.jpg')
  );
  const avatarSrc = Uint8Array.from(avatarData).buffer;

  return new ImageResponse(
    <div
      tw="flex flex-col justify-between items-start w-full h-full bg-[#F5F5F5] p-12"
      style={{
        backgroundSize: '80px 80px',
        backgroundImage:
          'linear-gradient(to right, #E5E5E5 1px, transparent 1px), linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)',
      }}
    >
      {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
      <img
        // @ts-expect-error "required"
        src={avatarSrc}
        alt="avatar"
        width={72}
        height={72}
        tw="overflow-hidden rounded-full"
      />
      <div tw="flex flex-col">
        <h1 tw="max-w-[48rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0">
          {title}
        </h1>
        {description && (
          <p tw="max-w-[30rem] text-[24px] font-normal leading-[32px] tracking-tight text-[#666666] mt-4 mb-0">
            {description}
          </p>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('Geist', title ?? '', '700'),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont('Geist', description ?? '', '400'),
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
};
