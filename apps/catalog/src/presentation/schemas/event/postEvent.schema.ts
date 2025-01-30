import { z } from 'zod';
import { eventSchema } from './event.schema';

export const postEventSchema = z.object({
  body: eventSchema.pick({ name: true, price: true }),
});

export type PostEventSchemaBody = z.infer<typeof postEventSchema>['body'];
