import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  event_id: z.string(),
  name: z.string(),
  price: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
