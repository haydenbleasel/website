import { Prose } from '@/components/prose';
import { basehub } from 'basehub';
import { Pump } from 'basehub/react-pump';
import { RichText } from 'basehub/react-rich-text';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

type AppProps = {
  params: {
    app: string;
  };
};

const BackgroundVideo = dynamic(() => import('next-video/background-video'));

export const generateMetadata = async ({ params }: AppProps) => {
  const { projects } = await basehub({ cache: 'no-store' }).query({
    projects: {
      apps: {
        __args: {
          filter: {
            _sys_slug: {
              eq: params.app,
            },
          },
        },
        items: {
          _title: true,
          description: {
            plainText: true,
          },
        },
      },
    },
  });

  if (!projects.apps.items.length) {
    return {};
  }

  const [app] = projects.apps.items;

  return {
    title: app._title,
    description: app.description?.plainText,
  };
};

const App = ({ params }: AppProps) => (
  <Pump
    queries={[
      {
        __typename: true,
        projects: {
          apps: {
            __args: {
              filter: {
                _sys_slug: {
                  eq: params.app,
                },
              },
            },
            items: {
              _title: true,
              _slug: true,
              description: {
                json: {
                  content: true,
                },
              },
              image: {
                width: true,
                height: true,
                url: true,
                alt: true,
              },
              url: true,
              video: {
                url: true,
                aspectRatio: true,
              },
            },
          },
        },
      },
    ]}
  >
    {/* biome-ignore lint/suspicious/useAwait: Server Actions must be async */}
    {async ([data]) => {
      'use server';

      if (!data.projects.apps.items.length) {
        return notFound();
      }

      const [app] = data.projects.apps.items;

      return (
        <>
          <section className="flex flex-col items-center justify-center gap-4 px-4 py-20 sm:px-0">
            <h1 className="text-center font-bold text-5xl leading-tight tracking-tight">
              <Balancer>{app._title}</Balancer>
            </h1>
            {app.video && (
              <div className="w-full max-w-3xl overflow-hidden border">
                <BackgroundVideo
                  src={app.video.url}
                  className="w-full"
                  style={{ aspectRatio: app.video.aspectRatio }}
                />
              </div>
            )}
          </section>
          <section className="py-16">
            <Prose className="mx-auto">
              <RichText content={app.description?.json.content} />
            </Prose>
          </section>
        </>
      );
    }}
  </Pump>
);

export default App;
