import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { UsersService } from '../users/users.service';


// Implementation sécurité auth
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {

            // On déconstruit user pour le retourner sans le mot de passe afin de ne pas créer de faille de sécurité
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Retrouver un utilisateur à partir de son email
    async login(readUserDto: ReadUserDto) {
        const foundUser = await this.usersService.findOne(readUserDto.email);

        if (!foundUser) { throw new NotFoundException(); }
        if (foundUser.password !== readUserDto.password) { throw new NotFoundException(); }

        const payload = {
            createdAt: new Date().toISOString(),
            sub: foundUser._id,
            role: '',
            email: foundUser.email
        };

        // On vérifie si l'utilisateur est l'admin
        payload.role = foundUser.email === 'admin@admin.fr' ? 'admin' : 'user';

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
