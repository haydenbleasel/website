const res = (status: ResponseInit['status'], data: object): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });

export default res;
