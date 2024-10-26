import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ProductosModule } from './productos/productos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { DetallePedidosModule } from './detalle-pedidos/detalle-pedidos.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.BD_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '*/**/entities/*.{ts|js}'],
    synchronize: true,
    autoLoadEntities: true,
  }),
  UsuariosModule,
  ClientesModule,
  EmpleadosModule,
  ProductosModule,
  PedidosModule,
  PagosModule,
  DetallePedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
