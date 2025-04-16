import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";



@Entity()
export class Roles{
    @PrimaryGeneratedColumn('increment')
    id:string;
    @Column({length:10, unique:true})
    name:string;

    @ManyToMany(()=>Users, user => user.roles)
    users:Users[];
}