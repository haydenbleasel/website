import { createMiddleware } from '@nosecone/next';

export default createMiddleware({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});
