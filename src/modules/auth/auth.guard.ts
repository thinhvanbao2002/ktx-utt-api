import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = this.jwtService.verify(token);
      
      request.user = {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role
      };
      
      if (roles && !roles.includes(decoded.role)) {
        throw new UnauthorizedException('You do not have permission');
      }
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
