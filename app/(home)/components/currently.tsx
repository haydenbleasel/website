import { ThirdsSection } from '@/components/sections/thirds';
import { BaseHubImage } from 'basehub/next-image';
import { Pump } from 'basehub/react-pump';

export const Currently = () => (
  <Pump
    queries={[
      {
        __typename: true,
        home: {
          currently: {
            text: true,
            image: {
              url: true,
              alt: true,
              width: true,
              height: true,
            },
            cta: true,
            link: true,
          },
        },
      },
    ]}
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      return (
        <ThirdsSection
          caption="Now"
          description={data.home.currently.text}
          buttons={[
            {
              label: data.home.currently.cta,
              href: data.home.currently.link,
            },
          ]}
        >
          <div className="pt-8 pl-8">
            <div className="dashed-line-top" />
            <div className="dashed-line-left" />
            <BaseHubImage
              src={data.home.currently.image.url}
              alt={data.home.currently.image.alt ?? ''}
              width={data.home.currently.image.width}
              height={data.home.currently.image.height}
              className="w-full rounded-tl-2xl border-t border-l"
            />
          </div>
        </ThirdsSection>
      );
    }}
  </Pump>
);
