import { Injectable } from '@nestjs/common';

@Injectable()
export class RestService {
  // TODO: common utils for all controllers could go here e.g. response formatting, error handling, etc.

  // API response standardization helper
  createResponse<T>(data: T, success = true, message?: string) {
    return {
      success,
      message,
      data,
    };
  }

  // error response helper
  createErrorResponse(message: string, statusCode: number = 400) {
    return {
      success: false,
      message,
      statusCode,
    };
  }
} 