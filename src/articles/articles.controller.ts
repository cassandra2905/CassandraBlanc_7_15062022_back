import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { CheckAuthorInterceptor } from 'src/checkauthor.interceptor';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';

// ECOUTE DES REQUETES ENTRANTES
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    // Requête pour sauvegarder le fichier de type image téléchargé
    @Post(':id/upload')
    @UseInterceptors(CheckAuthorInterceptor, FileInterceptor('image', {
        storage: diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                const dateUpload: string = (new Date(Date.now()).toISOString()).replace(/[:.]/g, '_');

                const type: string = file.mimetype == 'image/jpeg' ? 'jpg'
                    : file.mimetype == 'image/png' ? 'png'
                        : file.mimetype == 'image/webp' ? 'webp' : 'txt';

                cb(null, `${dateUpload}-${Math.round(Math.random() * 1E9)}.${type}`);
            }
        })
    }))

    // Fonction pour télécharger une image
    async uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators:
                    [
                        // Taille maximum de l'image 5 Mo
                        new MaxFileSizeValidator({ maxSize: 5_000_000 }),
                        // Formats d'images pris en charge pour le téléchargement
                        new FileTypeValidator({ fileType: 'jpeg|jpg|png|webp' }),
                    ],
            }),

        ) file: Express.Multer.File,
        @Param('id') id: string
    ) {
        console.log("file", file);
        return await this.articlesService.uploadAnImage(id, file.filename);
    }

    // Logique de la route qui permet de créer un article
    @Post()
    @UseInterceptors(CheckAuthorInterceptor)
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    // Logique de la route qui permet de liker un article
    @Post(':id/like')
    async likeAnArticle(@Param('id') id: string, @Body('userId') userId: string) {
        return await this.articlesService.likeAnArticle(id, userId);
    }

    // Logique de la route qui permet obtenir un article
    @Get(':id')
    async getOneArticle(@Param('id') id: string) {
        return await this.articlesService.getOneArticle(id);
    }

    // Logique de la route qui permet d'obtenir tous les articles
    @Get()
    async getAllArticles() {
        return await this.articlesService.getAllArticles();
    }

    // Logique de la route qui permet de mettre à jour un article
    @Put(':id')
    async updateArticle(@Param('id') id: string, @Body() article: updateArticleDto) {
        return this.articlesService.updateArticle(id, article);
    }

    // Logique de la route qui permet de supprimer un article
    @Delete(':id')
    async deleteArticle(@Param('id') id: string) {
        return this.articlesService.deleteArticle(id);
    }
}
