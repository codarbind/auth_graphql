import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccessToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.getArgs()[2]; // Third argument is context in GraphQL resolvers
    const headers = ctx.req.headers; // Accessing headers from the request object

    const token = headers['x-access-token'] as string;

    return token;
  },
);
