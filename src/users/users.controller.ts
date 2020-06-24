import { Controller, Request, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {

    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('register')
    async registerUser(@Body() user: UserEntity) {
        return await this.usersService.registerUser(user);
    }

    @Get(':id')
    async getUser(@Param() params) {
        return await this.usersService.getUser(params.id);
    }

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Delete(':id')
    async inactivateUser(@Param() params) {
        return await this.usersService.deleteUser(params.id);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        console.log(loginUserDto)
        return await this.authService.login(loginUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req)
        return req.user;
    }
}
