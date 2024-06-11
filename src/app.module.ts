import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { PersonaModule } from './persona/persona.module';
import { TipoIdentificacionModule } from './tipo-identificacion/tipo-identificacion.module';
import { RolModule } from './rol/rol.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/usuario.entity';
import { Persona } from './persona/persona.entity';
import { TipoIdentificacion } from './tipo-identificacion/tipo-identificacion.entity';
import { Roles } from './rol/rol.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { MarcaModule } from './marca/marca.module';
import { MetodoPagoController } from './metodo-pago/metodo-pago.controller';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.174.196.202',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
      entities: [Usuario,Persona,TipoIdentificacion,Roles],
      synchronize:true
    }),
    UsuarioModule,
    PersonaModule,
    TipoIdentificacionModule,
    RolModule,
    AuthModule,
    CategoriaModule,
    ProductoModule,
    MarcaModule,
    MetodoPagoModule
  ],
  controllers: [MetodoPagoController],
  providers: [],
})
export class AppModule {}
