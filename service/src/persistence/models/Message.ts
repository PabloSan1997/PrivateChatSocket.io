import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity({ name: 'message' })
export class MessageEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ length: 250 })
    message: string;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => Users, user => user.messageResive, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user_send'})
    usersend: Users;

    @ManyToOne(() => Users, user => user.messageResive, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user_recive'})
    userrecive: Users;

}