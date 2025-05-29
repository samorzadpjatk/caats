// TODO: files don't exist yet

import { Module } from '@nestjs/common'
import { RestService } from './rest.service'
import { AuthController } from './controllers/auth.controller'
import { UserController } from './controllers/user.controller'
import { EventsController } from './controllers/events.controller'
import { GroupController } from './controllers/group.controller'
import { TaskController } from './controllers/task.controller'
import { ScraperController } from './controllers/scraper.controller'
import { SourceController } from './controllers/sources.controller'
import { CalendarController } from './controllers/calendar.controller'
import { AppController } from './controllers/app.controller'

@Module({
  controllers: [
    AuthController,
    UserController,
    EventController,
    GroupController,
    TaskController,
    ScraperController,
    SourceController,
    CalendarController,
    AppController,
  ],
  providers: [RestService],
  exports: [RestService],
})
export class RestModule {}
