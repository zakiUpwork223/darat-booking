import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector, 
    ) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>(
            'roles',
            context.getHandler(),
        );

        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const user = request.user;
        return requiredRoles.some(role => user.role.includes(role));
    }
}
