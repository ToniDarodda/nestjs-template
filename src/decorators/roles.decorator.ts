import { SetMetadata } from '@nestjs/common';
import { Role } from 'types/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
