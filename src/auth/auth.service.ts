import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(readUserDto: ReadUserDto) {
        const foundUser = this.usersService.findOne(readUserDto.email);
        if (!foundUser) {
            throw new NotFoundException();
        }
        return foundUser;
    }
}
