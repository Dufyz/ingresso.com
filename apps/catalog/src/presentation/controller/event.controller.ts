import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateEventUsecase,
  DeleteEventUsecase,
  ListEventsUsecase,
  UpdateEventUsecase,
} from 'src/application/usecases/event';
import { PostEventSchemaBody } from '../schemas/event/postEvent.schema';
import { PatchEventSchemaBody } from '../schemas/event/patchEvent.schema';

@Controller('api/event')
export class EventController {
  constructor(
    private readonly createEventUsecase: CreateEventUsecase,
    private readonly deleteEventUsecase: DeleteEventUsecase,
    private readonly listEventsUsecase: ListEventsUsecase,
    private readonly updateEventUsecase: UpdateEventUsecase,
  ) {}

  @Get()
  async getEvents() {
    const eventsOrError = await this.listEventsUsecase.execute();

    if (eventsOrError.isFailure())
      throw new InternalServerErrorException(eventsOrError.value.message);

    const events = eventsOrError.value;
    return { events };
  }

  @Post()
  async postEvent(@Body() body: PostEventSchemaBody) {
    const eventOrError = await this.createEventUsecase.execute(body);

    if (eventOrError.isFailure())
      throw new InternalServerErrorException(eventOrError.value.message);

    const event = eventOrError.value;
    return { event };
  }

  @Patch(':id')
  async patchEvent(
    @Param('id') id: number,
    @Body() body: PatchEventSchemaBody,
  ) {
    const eventOrError = await this.updateEventUsecase.execute(id, body);

    if (eventOrError.isFailure())
      throw new InternalServerErrorException(eventOrError.value.message);

    const event = eventOrError.value;
    return { event };
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number) {
    const resultOrError = await this.deleteEventUsecase.execute(id);

    if (resultOrError.isFailure())
      throw new InternalServerErrorException(resultOrError.value.message);

    return {
      message: 'Event deleted succefully',
    };
  }
}
