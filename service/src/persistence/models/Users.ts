import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Roles } from "./Roles";
import { MessageEntity } from "./Message";


@Entity({name:'users'})
export class Users{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column({length:60, unique:true, nullable:false})
    username:string;
    @Column({length:60})
    nickname:string;
    @Column({length:500, nullable:false})
    password:string;
    @Column({length:500, nullable:false})
    urlImage:string;
    @Column({default:true})
    enabled:boolean;
    
    @ManyToMany(()=> Roles, roles => roles.users)
    @JoinTable({
        name:'user_role', 
        joinColumn:{name:'id_user'},
        inverseJoinColumn:{name:'id_role'}
    })
    roles:Roles[]

    @OneToMany(()=>MessageEntity, message => message.usersend, {cascade:true})
    messagesSend:MessageEntity[]

    @OneToMany(()=> MessageEntity, message => message.userrecive, {cascade:true})
    messageResive:MessageEntity[]
}