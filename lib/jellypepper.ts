type JellypepperResponse =
  | {
      error?: string;
    }
  | JellypepperClientProps[];

export type JellypepperClientProps = {
  name: string;
  logo: string;
  project: string | null;
};

const getJellypepperClients = async (): Promise<JellypepperClientProps[]> => {
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
  const jellypepperClients =
    (await jellypepperResponse.json()) as JellypepperResponse;

  if ('error' in jellypepperClients) {
    throw new Error(jellypepperClients.error);
  }

  return jellypepperClients as JellypepperClientProps[];
};

export default getJellypepperClients;
