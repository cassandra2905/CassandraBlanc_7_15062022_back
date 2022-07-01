import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

// Auteur par défaut de l'article
@Injectable()
export class CheckauthorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('before', request.body);
    if (!request.body.author) {
      request.body.author = 'Cassandra';
      console.log('after', request.body);
    }
    return next.handle();
  }
}
