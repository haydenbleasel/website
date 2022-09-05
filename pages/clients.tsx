import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  GroupField,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';

type ClientsData = {
  data: {
    title: KeyTextField;
    description: KeyTextField;
    rga: GroupField<{
      client: KeyTextField;
    }>;
    freelance: GroupField<{
      client: KeyTextField;
    }>;
  };
  jellypepper: GroupField<{
    client: KeyTextField;
  }>;
};

type ClientListData = {
  name: string;
  data: GroupField<{
    client: KeyTextField;
  }>;
};

const ClientList: FC<ClientListData> = ({ name, data }) => (
  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-8">
    <p className="flex-0 m-0 w-24 text-neutral-500 dark:text-neutral-400">
      {name}
    </p>
    <div className="flex flex-1 flex-col gap-1">
      {data
        .sort((clientA, clientB) => {
          if (!clientA.client || !clientB.client) {
            return 0;
          }

          return clientB.client < clientA.client ? 1 : -1;
        })
        .map(({ client }, index) => (
          <p className="m-0" key={index}>
            {client}
          </p>
        ))}
    </div>
  </div>
);

const Clients: FC<ClientsData> = ({ data, jellypepper }) => (
  <Layout
    title={data.title}
    description={data.description}
    subtitle={data.description}
  >
    <div className="flex flex-col gap-8">
      {[
        { name: 'RGA', data: data.rga },
        { name: 'Freelance', data: data.freelance },
        { name: 'Jellypepper', data: jellypepper },
      ].map((clientList, index) => (
        <div
          className="animate-enter opacity-0"
          key={clientList.name}
          style={{
            animationDelay: `${(index + 1) * 100}ms`,
          }}
        >
          <ClientList {...clientList} />
        </div>
      ))}
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const { data } = (await getPage(
    { previewData },
    'clients'
  )) as PrismicDocumentWithUID;
  const jellypepperResponse = await fetch(
    'https://jellypepper.com/api/clients',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passphrase: process.env.JELLYPEPPER_PASSPHRASE,
      }),
    }
  );
  const jellypepperClients = (await jellypepperResponse.json()) as {
    data: {
      client_name: string;
    };
  }[];

  const jellypepper = jellypepperClients.map((client) => ({
    client: client.data.client_name,
  }));

  return {
    props: {
      data,
      jellypepper,
    },
  };
};

export default Clients;
