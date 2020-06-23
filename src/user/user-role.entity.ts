import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('auth_roles')
export class UserRoleEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: number;
}
