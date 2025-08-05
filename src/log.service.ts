import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  logRequest(method: string, url: string, body: any, queryParams: any) {
    const logEntry = {
        method,
        url,
        body,
        queryParams,
        timestamp: new Date().toISOString(),
    };
    console.log("Log Service: ", JSON.stringify(logEntry, null, 2));
  }
}