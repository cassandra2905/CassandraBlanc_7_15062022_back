import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './models/article.schema';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
        MulterModule.register({
            dest: './upload',
        })
    ],
    providers: [ArticlesService],
    controllers: [ArticlesController]
})
export class ArticlesModule { }
