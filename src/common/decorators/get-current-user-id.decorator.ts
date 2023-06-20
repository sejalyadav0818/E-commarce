import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const { jwt_payload } = request.cookies;
  
    const user: JwtPayload = JSON.parse(
      Buffer.from(jwt_payload.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log(user.sub, user.email);

    return user.sub;
  },
);
