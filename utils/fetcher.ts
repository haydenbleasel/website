const fetcher = async <ResponseType>(url: string): Promise<ResponseType> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`,
    },
  });
  const data = (await response.json()) as ResponseType;

  return data;
};

export default fetcher;
