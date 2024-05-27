import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.174.196.202',
      port: 3306,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
      entities: []
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
