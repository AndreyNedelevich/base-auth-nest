import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUserData } from '../models/interfaces/user-data.interface';

export const CurrentUser = createParamDecorator<IUserData>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // получаем Express request
    return request.user as IUserData;
    // достаём пользователя (которого положил Guard)
  },
);
