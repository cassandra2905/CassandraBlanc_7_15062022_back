import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloAPI(): string {
    return 'Welcome to the Groupomania social network API!';
  }
}
