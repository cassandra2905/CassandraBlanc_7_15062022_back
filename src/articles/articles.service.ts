import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';
import { updateArticleDto } from './dto/update-article.dto';

// Implementation du CRUD logique métier des routes

@Injectable()
export class ArticlesService {
    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { }

    // On créer un nouvel article en base avec Mongoose
    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const createdArticle = new this.articleModel(createArticleDto);
        return await createdArticle.save();
    }

    // On veut tous les articles
    async getAllArticles(): Promise<Article[]> {
        return await this.articleModel.find().exec();
    }

    // On veut obtenir un seul article
    async getOneArticle(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    // On veut supprimer un article
    async deleteArticle(id: string) {
        return await this.articleModel.findByIdAndDelete(id).exec();
    }

    // On veut mettre à jour un article
    async updateArticle(id: string, article: updateArticleDto) {
        const updatedArticle = this.articleModel.findByIdAndUpdate(id, article, { new: true });
        return updatedArticle;
    }
}