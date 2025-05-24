import { 
    Controller,
    Body,
    Request,
    UseGuards, 
    Get,
    Put,
    Post,
    Param,
    Query
} from '@nestjs/common';

import { RestService } from '../rest.service';
import { AuthGuard } from '../../auth/auth.guard';
import { EventsQueryDto, ScheduleEventDto } from '../dtos';

/*
IMPORTANT NOTE: 
this is a placeholder implementation of the event controller.
It is meant to be replaced with a proper implementation
that interacts with the user service and handles user data.
The current implementation is just a stub to demonstrate the structure
and how the controller should look like.
*/

@Controller('api/events')
export class EventsController {
    // TODO: inject related services later
    constructor(private readonly restService: RestService) {}

    @Get()
    async getEvents(@Query() query: EventsQueryDto) {
        try {
            return this.restService.createResponse<ScheduleEventDto[]>(
                [
                    {
                        id: '1',
                        code: 'CS101',
                        subject: 'Computer Science 101',
                        type: 'Lecture',
                        startsAt: new Date().toISOString(),
                        endsAt: new Date(Date.now() + 3600000).toISOString(),
                        groups: ['Group A', 'Group B'],
                        hosts: ['Host 1'],
                        room: 'Room 101',
                        previous: null,
                        next: null,
                    },
                    // more events can be added here
                ]
            );
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @Get(':id')
    async getEventById(@Param('id') id: string) {
        try {
            return this.restService.createResponse<ScheduleEventDto>(
                {
                    id: '1',
                    code: 'CS101',
                    subject: 'Computer Science 101',
                    type: 'Lecture',
                    startsAt: new Date().toISOString(),
                    endsAt: new Date(Date.now() + 3600000).toISOString(),
                    groups: ['Group A', 'Group B'],
                    hosts: ['Host 1'],
                    room: 'Room 101',
                    previous: null,
                    next: null,
                },
            );
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }
}