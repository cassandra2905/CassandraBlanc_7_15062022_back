import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';
import { updateArticleDto } from './dto/update-article.dto';
import { unlink } from 'fs/promises';

// Implementation du CRUD logique métier des routes
@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { }

    // On créer un nouvel article en base avec Mongoose
    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const createdArticle = new this.articleModel(createArticleDto);
        return await createdArticle.save();
    }

    // On veut obtenir un seul article
    async getOneArticle(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    // On veut tous les articles classés du plus récent au plus ancien
    async getAllArticles(): Promise<Article[]> {
        return await this.articleModel.find().sort({ creationDate: -1 }).exec();
    }

    // On veut mettre à jour un article
    async updateArticle(id: string, article: updateArticleDto) {
        const old_article = await this.articleModel.findById(id).exec();
        if (article.image) {
            await unlink('./upload/' + old_article.image);
        } else {
            article.image = old_article.image;
        }
        const updatedArticle = this.articleModel.findByIdAndUpdate(id, article, { new: true });
        return updatedArticle;
    }

    // On veut supprimer un article
    async deleteArticle(id: string) {
        const article = await this.articleModel.findById(id).exec();
        await unlink('./upload/' + article.image);
        return await this.articleModel.findByIdAndDelete(id).exec();
    }

    // Pour mettre/enlever le j'aime d'un article
    async likeAnArticle(id: string, userId: string) {
        // Erreur si l'id n'est pas valide
        if (!Types.ObjectId.isValid(id)) { throw new BadRequestException(); }
        const article: Article = await this.articleModel.findById(id).exec();

        // Si l'article n'existe pas
        if (!article) { throw new NotFoundException(); }

        if (article.usersLiked.includes(userId)) {
            article.usersLiked = article.usersLiked.filter(id => id !== userId);
        }
        else {
            article.usersLiked.push(userId);
        }

        return await this.articleModel.findByIdAndUpdate(article._id, article, { new: true });
    }

    // Pour lier l'image d'un article
    async uploadAnImage(id: string, nameImage: string) {
        // Erreur si l'id n'est pas valide
        if (!Types.ObjectId.isValid(id)) { throw new BadRequestException(); }
        const article: Article = await this.articleModel.findById(id).exec();

        // Si l'article n'existe pas
        if (!article) { throw new NotFoundException(); }
        article.image = nameImage;

        return await this.articleModel.findByIdAndUpdate(article._id, article, { new: true });
    }
}