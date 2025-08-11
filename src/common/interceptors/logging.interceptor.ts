import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    console.log(`[Interceptor-Start] ${req.method}, ${req.url}`);

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - now;
        console.log(`[Interceptor-End] ${req.method}, ${req.url} - Duration: ${duration}ms`);
      })
    );
  }     
}
        