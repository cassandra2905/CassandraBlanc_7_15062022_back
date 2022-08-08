import { Schema } from 'mongoose';

// On créer le schéma mongoose pour la collection Articles 
export const ArticleSchema = new Schema({
    title: String,
    image: String,
    content: String,
    author: String,
    creationDate: String,
    usersLiked: Array<String>
});