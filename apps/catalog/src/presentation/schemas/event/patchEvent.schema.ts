import { z } from 'zod';
import { eventSchema } from './event.schema';

export const patchEventSchema = z.object({
  body: eventSchema
    .pick({
      name: true,
      price: true,
    })
    .partial(),
});

export type PatchEventSchemaBody = z.infer<typeof patchEventSchema>['body'];
