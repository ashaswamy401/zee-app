import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [RegistrationController],
    providers: [RegistrationService],
})
export class RegistrationModule {}
