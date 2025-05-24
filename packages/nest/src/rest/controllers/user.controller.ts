import { 
    Controller,
    Body,
    Request,
    UseGuards, 
    Get,
    Put,
    Post
} from '@nestjs/common';

import { RestService } from '../rest.service';
import { AuthGuard } from '../../auth/auth.guard';
import { EventsQueryDto, ScheduleEventDto } from '../dtos';

/*
IMPORTANT NOTE: 
this is a placeholder implementation of the user controller.
It is meant to be replaced with a proper implementation
that interacts with the user service and handles user data.
The current implementation is just a stub to demonstrate the structure
and how the controller should look like.
*/


@Controller('api/user')
export class UserController {
    // also user service
    constructor(private readonly restService: RestService) {}

    @UseGuards(AuthGuard) // to bezdie pozniej na authentiku zamiast google
    @Get('me')
    async getMe(@Request() req) {
        try {
            // todo: after linking user service do logic here
            return this.restService.createResponse({
                id: '1',
                name: 'Jan Kowalski',
            });
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Put('me/groups')
    async updateUserGroups(@Request() req, @Body() updateGroupsDto: UpdateGroupsDto) {
        try {
            // todo: after linking user service do logic here
            return this.restService.createResponse({
                success: true,
                message: 'User groups updated successfully',
            });
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('me/events')
    async getEvents(@Request() req, @Body() queryDto: EventsQueryDto) {
        try {
            // todo: after linking user service do logic here
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

    @UseGuards(AuthGuard)
    @Get('me/current-event')
    async getCurrentEvent(@Request() req) {
        try {
            // todo: after linking user service do logic here
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
                }
            );

        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('me/next-event')
    async getNextEvent(@Request() req) {
        try {
            // todo: after linking user service do logic here
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
                }
            );

        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }
}