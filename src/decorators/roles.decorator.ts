import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
