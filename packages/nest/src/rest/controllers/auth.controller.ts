import { Controller, Post, Body } from '@nestjs/common';

import { RestService } from '../rest.service';

// TOOD: probably in a separate file
class GoogleAuthDto {
    code: string;
}

@Controller('api/auth')
export class AuthController {
    constructor(private readonly restService: RestService) {}

    @Post('google')
    async googleAuth(@Body() authDto: GoogleAuthDto) {
        try {
            return this.restService.createResponse({
                accessToken: 'dupadupa-placeholder-naraize-to-jestziomus',
                sessionId: 'dupadupa-placeholder-naraize-to-jestziomus',
                user: {
                    id: 'dupadupa-placeholder-naraize-to-jestziomus',
                    email: 'pewnie id samo to powinno',
                    name: 'styknac zeby polaczyc kropki',
                    // inne user pola
                },
            });
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }

    @Post('logout')
    async logout() {
        try {
            // to tez jest placeholderowo, auth w obecnyym
            // kontekscie wymaga wiecej uwagi bo trzeba na 
            // to patrzec ze to jest jednak backend a nie 
            // full-stackowa apka
            return this.restService.createResponse({ success: true });
        } catch (error) {
            return this.restService.createErrorResponse(error.message);
        }
    }
}
