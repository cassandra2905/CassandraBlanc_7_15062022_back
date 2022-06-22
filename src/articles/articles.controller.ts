import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';

// Ecoute les requêtes entrantes
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }
    // Fonction pour créer un article
    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
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
    // Fonction pour supprimer un article
    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        return this.articlesService.deleteArticle(id);
    }
    // Fonction pour mettre à jour un article
    @Put(':id')
    async updateArticle(@Param('id') id: string, @Body() article: updateArticleDto) {
        return this.articlesService.updateArticle(id, article);
    }


}
