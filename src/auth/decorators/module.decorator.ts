import { SetMetadata } from '@nestjs/common';

export const ModuleAccess = (moduleName: string) => SetMetadata('module', moduleName);
