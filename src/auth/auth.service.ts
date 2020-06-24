import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);
        
        return {
            email: user.email,
            ...token,
        };
    }

    private _createToken({ email }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN;

        const user = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }
}
