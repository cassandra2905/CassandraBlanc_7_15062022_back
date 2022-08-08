import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';

// On connecte le serveur au port 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Taille maximale des fichiers reçus en JSON + URL
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ limit: '20mb', extended: true }));

  // On évite les erreurs CORS
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
