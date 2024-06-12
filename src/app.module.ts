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
import { Rol } from './rol/rol.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
<<<<<<< HEAD
import { PromocionModule } from './promocion/promocion.module';
=======
import { MarcaModule } from './marca/marca.module';
>>>>>>> f31f46d15ef4e21b7c4f9a1b0cb6d2f2c1adcd59
import { MetodoPagoModule } from './metodo-pago/metodo-pago.module';
import { Pedido } from './pedido/pedido.entity'; // Asegúrate de importar la entidad Pedido
import { MetodoPago } from './metodo-pago/metodo-pago.entity';
<<<<<<< HEAD
=======
import { Marca } from './marca/marca.entity';
import { Categoria } from './categoria/categoria.entity';
import { Producto } from './producto/producto.entity';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { Detalle_pedido } from './detalle_pedido/detalle_pedido.entity';
import { DevolucionController } from './devolucion/devolucion.controller';
import { DevolucionService } from './devolucion/devolucion.service';
import { DevolucionModule } from './devolucion/devolucion.module';
import { Devolucion } from './devolucion/devolucion.entity';
>>>>>>> f31f46d15ef4e21b7c4f9a1b0cb6d2f2c1adcd59

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
      entities: [
        Usuario,
        Persona,
        TipoIdentificacion,
        Roles,
        Pedido,
        MetodoPago,
      ],
=======
      entities: [Usuario, Persona, TipoIdentificacion, Rol, Marca, Categoria, Producto, MetodoPago, Pedido, Detalle_pedido, Devolucion], // Asegúrate de incluir Pedido aquí
>>>>>>> f31f46d15ef4e21b7c4f9a1b0cb6d2f2c1adcd59
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
    MarcaModule,
    MetodoPagoModule,
=======
    MetodoPagoModule,
    DevolucionModule,
>>>>>>> f31f46d15ef4e21b7c4f9a1b0cb6d2f2c1adcd59
  ],
  
})
export class AppModule {}
