import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectEntityModel  } from '@midwayjs/typeorm';
import { v4 as uuidV4 } from 'uuid';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel:Repository<User>;
  @Inject()
  redisService:RedisService
  async getUserList() {
    let result = await this.userModel.find({})
    return result
  }
  async login(userName: string, password : string) {
    let user = await this.userModel.findOneBy({
      loginName:userName,
      password:password
    })
    console.log('uesr mysql-----',user)
    if(user) {
      let uuid = uuidV4()
      //设置过期时间
      await this.redisService.set('userinfo_'+ uuid, JSON.stringify(user) ,'EX' , 8400);
      return {
        userId:user.id,
        token:uuid,
        nickName:user.nickName
      }
    } else {
      return null;
    }
  }
  /**
   * 删除用户
   * @returns 
   */
  async deleteUser(userId:number) {
    let result = await this.userModel.delete(userId);
    if(result && result.affected > 0) {
      return true
    }else {
      return false
    }
  }

  async register(userInfo:IUserOptions) {
    let userData = new User();
    userData.email = userInfo.email;
    userData.loginName = userInfo.loginName;
    userData.password = userInfo.password;
    userData.nickName = userInfo.nickName;
    
    let resultUser = await this.userModel.save(userData);
    if(resultUser.id > -1) {
      return true;
    }else {
      return false;
    }
  }
}
