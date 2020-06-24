import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) { }

    async registerUser(user: UserEntity): Promise<UserEntity> {
        const { email } = user;
        const userInDb = await this.userRepo.findOne({ where: { email } })
        if (userInDb) {
            throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
        }

        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password);
        const auth_user = await this.userRepo.save(user);
        return auth_user;
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRepo.find();
        return users;
    }

    async getUser(userid: number): Promise<UserEntity[]> {
        const user = await this.userRepo.find({
            where: [{ id: userid }]
        });
        return user;
    }

    async deleteUser(userid: number): Promise<UserEntity> {
        const inactive_user = await this.userRepo.findOneOrFail(userid);
        inactive_user.status = 1;
        return await this.userRepo.save(inactive_user);
    }

    async findByLogin({ email, password }: LoginUserDto): Promise<any> {
        const user = await this.userRepo.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            console.log('Inside user service exception');
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        // password = await bcrypt.hash(password, 10);
        console.log(password, user.password)
        // compare passwords
        const areEqual = await user.comparePassword(password);
        console.log(areEqual);
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

}
