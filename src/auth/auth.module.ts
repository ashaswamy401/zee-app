import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [AuthService, UsersService, JwtStrategy],
    controllers: [UsersController],
    exports: [AuthService, UsersService]
})
export class AuthModule { }
