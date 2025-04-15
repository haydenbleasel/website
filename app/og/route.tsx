import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get('title');
  const avatarData = await readFile(
    join(process.cwd(), 'components/avatar/avatar.jpg')
  );
  const avatarSrc = Uint8Array.from(avatarData).buffer;
  const geistBold = await readFile(
    join(process.cwd(), 'app/og/Geist-Bold.ttf')
  );

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
      <h1 tw="max-w-[48rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0">
        {title}
      </h1>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: geistBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
};
