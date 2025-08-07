import { Injectable, NestMiddleware } from "@nestjs/common";
import { LogService } from "./log.service";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

    use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl: url, body, query } = req;
    this.logService.logRequest(method, url, body, query);
    next();
  }
}