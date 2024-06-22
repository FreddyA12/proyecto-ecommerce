import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermisoService } from 'src/permiso/permiso.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PermisosGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permisoService: PermisoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const requiredModule = this.reflector.get<string>('module', context.getHandler());

    if (!requiredPermissions && !requiredModule) {
      return true;
    }
  
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, 'somoslosmejores'); 
      request.user = decoded;
    } catch (error) {
      throw new ForbiddenException('Token inválido o expirado');
    }
  
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }
  
    const userPermissions = await this.permisoService.getUserPermissions(user.id_usuario);
    const userModules = await this.permisoService.getUserModules(user.id_usuario);
    
    if (requiredModule && !userModules.includes(requiredModule)) {
      throw new ForbiddenException('No tienes permisos para acceder a este módulo');
    }

    if (requiredPermissions && !requiredPermissions.every(permission => userPermissions.includes(permission))) {
      throw new ForbiddenException('No tienes permisos para realizar esta acción');
    }

    return true;
  }
}
