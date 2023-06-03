import { ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    const context = GqlExecutionContext.create(ctx);
    const { req } = context.getContext();
    return super.canActivate(new ExecutionContextHost([req])); // NOTE
  }
}
