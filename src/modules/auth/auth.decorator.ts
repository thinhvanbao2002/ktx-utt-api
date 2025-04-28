import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

/**
 * Custom decorator để xác thực & phân quyền trong cùng một decorator
 * @param roles - Danh sách vai trò được phép truy cập
 */
export function Auth(...roles: number[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard));
}
