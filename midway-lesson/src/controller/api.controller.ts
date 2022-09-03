import { Inject, Controller, Get ,Post , Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserInfo , IUserOptions} from '../interface'
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/getUserList')
  async getUserList() {
    const userList = await this.userService.getUserList();
    return { success: true, message: 'OK', data: userList };
  }
  @Post('/login')
  async login(@Body() user:UserInfo) {
    console.log('user----',user)
    const { userName , password } = user
    const userInfo = await this.userService.login(userName,password)
    let status = userInfo ? true : false 
    return {
      success:status,
      message:`登录${status?'成功':'失败'}`
    }
  }

  @Post('/deleteUser')
  async deleteUser(@Body('userId') userId) {
    const status = await this.userService.deleteUser(userId);
    return {success: status , message: status? "删除成功":"删除失败" }
  }
  /**
   * 用户注册
   * @param userInfo 
   * @returns 
   */
  @Post('/register')
  async register(@Body() userInfo:IUserOptions) {
    const status = await this.userService.register(userInfo)
    return { success: status, message: '注册成功' };
  }
}
