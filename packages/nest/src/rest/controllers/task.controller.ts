import {
  Controller,
  Body,
  Request,
  UseGuards,
  Get,
  Put,
  Post,
  Param,
  Query,
} from '@nestjs/common'

import { RestService } from '../rest.service'
import { AuthGuard, SuperuserGuard, ScraperGuard } from '../../auth/auth.guard'
import {
  StoredTaskDto,
  FinishTaskDto,
  ScheduleEventDto,
  TasksBulkDto,
  TaskStateDto,
} from '../dtos'
import { GqlStoredTask } from '../../gql'

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
  @Get()
  async getTasks() {
    try {
      return this.restService.createResponse<StoredTaskDto[]>([
        {
          createdAt: new Date(), // toISOString() ?
          finalHash: 'abc123',
          finishedAt: null,
          id: '1',
          initialHash: 'xyz789',
          scraper: {
            id: 'scraper1',
            alias: 'Example Scraper',
            lastSeen: new Date(),
            state: 'ACTIVE', // Placeholder state
          },
          status: 'PENDING', // Placeholder status
        },
        // more tasks can be added here
      ])
    } catch (error) {
      return this.restService.createErrorResponse(error.message)
    }
  }

  @UseGuards(AuthGuard, SuperuserGuard)
  @Post('bulk')
  async bulkCreateTasks(@Body() bulkDto: TasksBulkDto) {
    try {
      // todo: placeholder logic for bulk task creation, connect to supervisor service later
      return this.restService.createResponse({
        success: true,
        message: 'Tasks created successfully',
      })
    } catch (error) {
      return this.restService.createErrorResponse(error.message)
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
      return this.restService.createErrorResponse(error.message)
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
      return this.restService.createErrorResponse(error.message)
    }
  }
}
