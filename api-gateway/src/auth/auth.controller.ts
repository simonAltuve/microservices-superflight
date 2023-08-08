import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Req() req){
        return await this.authService.signIn(req.user);
    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO){
        return await this.authService.signUp(userDTO)
    }
}
