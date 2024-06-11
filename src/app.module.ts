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
import { MarcaModule } from './marca/marca.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
<<<<<<< HEAD
import { PromocionModule } from './promocion/promocion.module';
=======
import { MarcaModule } from './marca/marca.module';
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { Pedido } from './pedido/pedido.entity';
import { MetodoPago } from './metodo-pago/metodo-pago.entity';
>>>>>>> 8a54b7605ba601449cd70d33ed880c68c5c549d1

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.174.196.202',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
<<<<<<< HEAD
      entities: [Usuario, Persona, TipoIdentificacion, Roles],
=======
      entities: [Usuario, Persona, TipoIdentificacion, Roles, Pedido, MetodoPago],
>>>>>>> 8a54b7605ba601449cd70d33ed880c68c5c549d1
      synchronize: true,
    }),
    UsuarioModule,
    PersonaModule,
    TipoIdentificacionModule,
    RolModule,
    AuthModule,
    MarcaModule,
    DetallePedidoModule,
    CategoriaModule,
    ProductoModule,
<<<<<<< HEAD
    PromocionModule,
=======
    MarcaModule,
    MetodoPagoModule,
>>>>>>> 8a54b7605ba601449cd70d33ed880c68c5c549d1
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
