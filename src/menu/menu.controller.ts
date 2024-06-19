import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { CreateMenuDTO } from './create-menu-dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDTO): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Menu> {
    return this.menuService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMenuDto: CreateMenuDTO): Promise<Menu> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.menuService.remove(id);
  }
}
