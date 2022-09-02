import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel  } from '@midwayjs/typeorm';
import { v4 as uuidV4 } from 'uuid';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class UserService {
  @InjectEntityModel(User);
  userModel:Repository<User>;
  @Inject()
  redisService:RedisService
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async login(userName: string, password : string) {
    console.log('------',userName)
    let user = await this.userModel.findOneBy({
      loginName:userName,
      password:password
    })
    console.log('uesr mysql-----',user)
    if(user) {
      let uuid = uuidV4()
      //设置过期时间
      await this.redisService.set('userinfo_'+ uuid, JSON.stringify(user) ,'KEEPTTL' , 'XX');
      return {
        userId:user.id,
        token:uuid,
        nickName:user.nickName
      }
    } else {
      return null;
    }
  }
}
