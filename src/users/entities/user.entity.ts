import { Entity, PrimaryGeneratedColumn, OneToOne, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @Column()
    auth_role_id: number;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        console.log("Password inside dto" + this.password);
        if (this.password)
            this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

}
