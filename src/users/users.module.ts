import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/articles/models/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// On précise le nom de la collection dans la base de données ainsi que le schéma que doit respecter un document type user
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
