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
import { AuthGuard, SuperuserGuard, ScraperGuard } from '../../auth/auth.guard';
import { EventsQueryDto, FinishTaskDto, ScheduleEventDto, TasksBulkDto, TaskStateDto, } from '../dtos';

/*
IMPORTANT NOTE: 
this is a placeholder implementation of the event controller.
It is meant to be replaced with a proper implementation
that interacts with the user service and handles user data.
The current implementation is just a stub to demonstrate the structure
and how the controller should look like.
*/

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly restService: RestService) {}

    @UseGuards(AuthGuard, SuperuserGuard)
    @Post('bulk')
    async bulkCreateTasks(@Body() bulkDto: TasksBulkDto) {
        try {
            // todo: placeholder logic for bulk task creation, connect to supervisor service later
            return this.restService.createResponse({
                success: true,
                message: 'Tasks created successfully',
            });
       } catch (error) {
            return this.restService.createErrorResponse(error.message);
       }
    }

    @UseGuards(ScraperGuard)
    @Put(':id/state')
    async updateTaskState(@Param('id') id: string, @Body() body: TaskStateDto) {
        try {
            // todo: placeholder logic for bulk task creation, connect to supervisor service later
            return this.restService.createResponse({
                success: true,
                message: 'Tasks updated successfully',
            })
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @UseGuards(ScraperGuard)
    @Post(':id/finish')
    async finishTask(@Param('id') id: string, @Body() body: FinishTaskDto) {
        try {
            // todo: placeholder logic for bulk task creation, connect to supervisor service later
            return this.restService.createResponse({
                success: true,
                message: 'Tasks finished successfully',
            })
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }
}