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

import { ScraperDto, CreateScraperDto, WorkingScraperDto, } from '../dtos';

/*
IMPORTANT NOTE: 
this is a placeholder implementation of the event controller.
It is meant to be replaced with a proper implementation
that interacts with the user service and handles user data.
The current implementation is just a stub to demonstrate the structure
and how the controller should look like.
*/

@Controller('api/scraper')
export class ScraperController {
    constructor(private readonly restService: RestService) {}

    @UseGuards(AuthGuard, SuperuserGuard)
    @Post()
    async createScraper(@Body() createDto: CreateScraperDto, @Request() req) {
        try {
            return this.restService.createResponse(
                {
                    token: "token",
                }
            );
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @Get('ongoing')
    async getOngoingScrapers() {
        try {
            // all placeholder data, replace with actual logic
            return this.restService.createResponse<WorkingScraperDto[]>(
                [
                    {
                        alias: 'Example Scraper',
                        currentTask: {
                            createdAt: new Date(),
                            id: 'task1',
                            status: { state: 'RUNNING' },
                            targetDate: new Date('2023-10-01'),
                        },
                        id: 'scraper1', 
                        lastSeen: new Date(),
                        state: 'ACTIVE', 
                    },
                ]
            );
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @Get()
    async getAllScrapers() {
        try {
            return this.restService.createResponse<ScraperDto[]>(
                [
                    {
                        id: 'scraper1',
                        alias: 'Example Scraper',
                        lastSeen: new Date(),
                        state: 'ACTIVE', 
                    },
                    {
                        id: 'scraper2',
                        alias: 'Another Scraper',
                        lastSeen: new Date(),
                        state: 'OUTDATED', 
                    },
                ]
            );  
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }
}
