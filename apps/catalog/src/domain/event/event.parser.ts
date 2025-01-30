import { Event } from './event.entity';

export function parseEventFromDB(event: Event): Event {
  return {
    id: event.id,
    event_id: event.event_id,
    name: event.name,
    price: event.price,
    created_at: event.created_at,
    updated_at: event.updated_at,
  };
}
