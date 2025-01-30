import { EventRepository } from 'src/infra/database/repositories/event.repository';

describe('Event repository - List', () => {
  it('Should successfully list events', async () => {
    const repository = new EventRepository();

    const eventOrError = await repository.create({
      name: 'Event name',
      price: 100,
    });

    if (eventOrError.isFailure()) {
      throw new Error(eventOrError.value.message);
    }

    const event = eventOrError.value;

    const eventsOrError = await repository.list();

    if (eventsOrError.isFailure()) {
      throw new Error(eventsOrError.value.message);
    }

    const events = eventsOrError.value;

    expect(events).toContainEqual(
      expect.objectContaining({
        id: event.id,
        event_id: expect.any(String) as unknown as string,
        name: event.name,
        price: event.price,
        created_at: expect.any(Date) as unknown as Date,
        updated_at: expect.any(Date) as unknown as Date,
      }),
    );
  });
});
