import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';


// Implementation logique métier de la route user

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto)
        return await createdUser.save();
    }

    // Fonctionnalité permettant de retrouver un utilisateur par son adresse mail
    async findOne(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
