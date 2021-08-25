import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import RequestWithUser from 'src/auth/request-with-user';
import { User } from 'src/user/entities/user.entity';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

/** A decorator class that handles role authorization */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Get all the required roles from metadata
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // Authorization is valid if no required role is found
        if (!requiredRoles) {
            return true;
        }
        // Get user from request
        const request: RequestWithUser = context.switchToHttp().getRequest();
        const user: User = request.user
        // Authorization invalid if there is no user
        if (!user) return false
        // Check if user role is matched with any of the required roles
        return requiredRoles.some((role) => user.role === role);
    }
}