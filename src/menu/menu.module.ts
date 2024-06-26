import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './menu.entity';
import { Rol } from '../rol/rol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu, Rol])
  ],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
