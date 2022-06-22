import * as mongoose from 'mongoose';

// On créer le schéma mongoose pour la collection Articles 
export const ArticleSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: String,
    creationDate: String,
});