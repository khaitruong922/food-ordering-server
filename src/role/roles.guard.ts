import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import RequestWithUser from 'src/auth/request-with-user';
import { User } from 'src/user/entities/user.entity';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request: RequestWithUser = context.switchToHttp().getRequest();
        const user: User = request.user
        if (!user) return false
        return requiredRoles.some((role) => user.role === role);
    }
}