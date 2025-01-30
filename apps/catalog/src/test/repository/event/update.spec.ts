import { EventRepository } from 'src/infra/database/repositories/event.repository';

describe('Event repository - Update', () => {
  it('Should successfully update a event', async () => {
    const repository = new EventRepository();

    const eventOrError = await repository.create({
      name: 'Event name',
      price: 100,
    });

    if (eventOrError.isFailure()) {
      throw new Error(eventOrError.value.message);
    }

    const event = eventOrError.value;

    const upatedEventOrError = await repository.update(event.id, {
      name: 'Event updated',
    });

    if (upatedEventOrError.isFailure()) {
      throw new Error(upatedEventOrError.value.message);
    }

    const updatedEvent = upatedEventOrError.value;
    expect(updatedEvent).toEqual({
      id: event.id,
      event_id: expect.any(String) as unknown as string,
      name: 'Event updated',
      price: '100.00',
      created_at: expect.any(Date) as unknown as Date,
      updated_at: expect.any(Date) as unknown as Date,
    });
  });
});
