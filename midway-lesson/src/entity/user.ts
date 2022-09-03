import { Entity , Column , PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({ name:'login_name' ,length:45})
  loginName:string
  @Column({ name:'nick_name' , length:45 })
  nickName:string;
  @Column()
  email:string;
  @Column()
  phone:string;
  @Column({ name : 'last_login_time'})
  lastLoginTime:Date
  @Column({ name : 'last_login_ip'})
  lastLoginIp:string;
  @Column({ length:45})
  password:string
}
