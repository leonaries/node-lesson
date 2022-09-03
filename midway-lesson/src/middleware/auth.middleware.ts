import { IMiddleware } from '@midwayjs/core';
import { Inject, Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { RedisService } from '@midwayjs/redis';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  redisService:RedisService
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let token = ctx.headers["authorization"]
      console.log('token------',token)
      if(ctx.path !== "/api/login" && ctx.path !== "/api/register") {
        if(token) {
          let userinfo= await this.redisService.get('userinfo_'+ token)
          if(!userinfo) {
            return { success:false , msg:'token 错误' }
          }
        }else {
          return {
            success:false,
            msg:'token错误'
          }
        }
      }
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 控制器之后执行的逻辑
      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}
