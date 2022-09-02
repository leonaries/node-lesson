import { Inject, Controller, Get, Query ,Post , Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserInfo } from '../interface'
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user , reqUid:uid };
  }
  @Post('/register_user')
  async registerUser(@Body() user:UserInfo) {
    return { success: true, message: '注册成功' ,data:user };
  }
  @Post('/login')
  async login(@Body() user:UserInfo) {
    console.log('user----',user)
    const { userName , password } = user
    const userInfo = await this.userService.login(userName,password)
    let status = userInfo ? true : false 
    if(status) {
      return { status: status, message: '登录成功' ,data:userInfo };
    } else {
      return { status: status, message: '登录失败' ,data:userInfo };
    }
  }
}
