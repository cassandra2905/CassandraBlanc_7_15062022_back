import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// On connecte le serveur au port 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // On évite les erreurs CORS
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
