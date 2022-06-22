import { Body, Controller, Post } from '@nestjs/common';
import { ReadUserDto } from '../users/dto/read-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // Route permettant d'écouter le post vers login
    @Post('login')
    async login(@Body() readUserDto: ReadUserDto) {
        return this.authService.login(readUserDto);
    }
}
