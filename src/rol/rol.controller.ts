import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('Roles')
@Controller('rol')
export class RolController {}
