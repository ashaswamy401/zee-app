import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { RegistrationService } from './registration.service';

@Controller('user')
export class RegistrationController {

    constructor(private regService: RegistrationService) { }

    @Post('register')
    async registerUser(@Body() user: UserEntity) {
        return await this.regService.registerUser(user);
    }

    @Get(':id')
    async getUser(@Param() params) {
        return await this.regService.getUser(params.id);
    }

    @Get()
    async getUsers() {
        return await this.regService.getUsers();
    }

    @Delete(':id') 
    async inactivateUser(@Param() params) {
        return await this.regService.deleteUser(params.id);
    }
}
