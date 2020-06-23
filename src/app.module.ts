import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationService } from './user/registration/registration.service';
import { RegistrationController } from './user/registration/registration.controller';
import { RegistrationModule } from './user/registration/registration.module';
import { LoginService } from './user/login/login.service';
import { LoginController } from './user/login/login.controller';
import { LoginModule } from './user/login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'provab',
      password: 'bookstore',
      database: 'sample_zee',
      autoLoadEntities: true,
    }),
    RegistrationModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
