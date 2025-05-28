import { Controller, Get } from '@nestjs/common'
import { RestService } from '../rest.service'

@Controller('api/sources')
export class SourceController {
  constructor(private readonly restService: RestService) {}

  @Get()
  async getSources() {
    try {
      return this.restService.createResponse<EventSource[]>([
        {
          createdAt: new Date(), // not sure of the error here
          id: '1',
          object: '',
          task: {
            createdAt: new Date(),
            id: 'task-1',
            status: 'PENDING',
          },
        },
      ])
    } catch (error) {
      return this.restService.createErrorResponse(error.message)
    }
  }
}
