import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { CheckauthorInterceptor } from 'src/checkauthor.interceptor';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { Express } from 'express';

// Ecoute les requêtes entrantes
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    // Fonction pour créer un article
    @Post()
    @UseInterceptors(CheckauthorInterceptor, FileInterceptor('image'))
    async createArticle(
        @Body() createArticleDto: CreateArticleDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log('createArticleDto', createArticleDto);
        console.log("file", file);
        return await this.articlesService.create(createArticleDto);
    }

    @Post(':id/like')
    async likeAnArticle(@Param('id') id: string, @Body('userId') userId: string) {
        return await this.articlesService.likeAnArticle(id, userId);
    }

    // Fonction pour obtenir un article
    @Get(':id')
    async getOneArticle(@Param('id') id: string) {
        return await this.articlesService.getOneArticle(id);
    }

    // Fonction pour obtenir tous les articles
    @Get()
    async getAllArticles() {
        return await this.articlesService.getAllArticles();
    }

    // Fonction pour mettre à jour un article
    @Put(':id')
    async updateArticle(@Param('id') id: string, @Body() article: updateArticleDto) {
        return this.articlesService.updateArticle(id, article);
    }

    // Fonction pour supprimer un article
    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        return this.articlesService.deleteArticle(id);
    }
}
