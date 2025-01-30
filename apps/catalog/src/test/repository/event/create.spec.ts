import { EventRepository } from 'src/infra/database/repositories/event.repository';

describe('Event repository - Create', () => {
  it('Should successfully create a event', async () => {
    const repository = new EventRepository();

    const eventOrError = await repository.create({
      name: 'Event name',
      price: 100,
    });

    if (eventOrError.isFailure()) {
      throw new Error(eventOrError.value.message);
    }

    const event = eventOrError.value;
    expect(event).toEqual({
      id: event.id,
      event_id: expect.any(String) as unknown as string,
      name: 'Event name',
      price: '100.00',
      created_at: expect.any(Date) as unknown as Date,
      updated_at: expect.any(Date) as unknown as Date,
    });
  });
});
