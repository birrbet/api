import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ForbiddenException } from "src/core/exceptions/forbidden.exception";

@Injectable()
export class GqlPermissionGuard  implements CanActivate {
    constructor(private requiredPermissions: string[]) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const role = request?.user?.role;
        if(!request?.user && !role) {
            throw new ForbiddenException("Your are not authorized to access this resource.")
        }
        return this.isPermitted(role);
    }
    async isPermitted(role: any): Promise<boolean> {
        // is the role is permitted to do this?
        const isNotPermitted = role.permissions.map(
            (permission) => this.requiredPermissions.includes(permission))
            .includes(false);
        return !isNotPermitted;
    }
}