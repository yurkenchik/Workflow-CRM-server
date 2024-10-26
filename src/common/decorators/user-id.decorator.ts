import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const UserId = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user?.id;
    }
)