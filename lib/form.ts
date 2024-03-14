import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
  type: z.enum(['general', 'contract', 'advisory', 'agency']),
});
