import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { UserRoleEntity } from "./user-role.entity";

@Entity('auth_users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    status: number;

    // @OneToOne(type => UserRoleEntity)
    @Column()
    auth_role_id: number;


}
