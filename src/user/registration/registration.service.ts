import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationService {

    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) { }

    async registerUser(user: UserEntity): Promise<UserEntity> {
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
}
