import { Inject, Controller, Get, Query ,Post , Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { IUserOptions as User } from '../interface'
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
  async registerUser(@Body() user:User) {
    return { success: true, message: '注册成功' ,data:user };
  }
}
