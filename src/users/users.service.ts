import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';


// Implementation logique métier de la route user

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // Créer un nouvel utilisateur
    async create(createUserDto: CreateUserDto): Promise<User> {

        // Sécuristation mot de passe hachage
        const password_hashed = await hash(createUserDto.password, 10);

        const user: CreateUserDto = {
            email: createUserDto.email,
            password: password_hashed
        }

        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    // Fonctionnalité permettant de retrouver un utilisateur par son adresse mail
    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
