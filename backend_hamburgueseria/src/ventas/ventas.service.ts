import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Producto } from 'src/productos/entities/producto.entity';

import { UpdateVentaDto } from './dto/update-venta.dto';
import { VentaDetalle } from 'src/ventas-detalles/entities/ventas-detalle.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createVentaDto: CreateVentaDto) {
    const { idCliente, ventaDetalleDto } = createVentaDto;

    // Verificar que el cliente exista
    const cliente = await this.dataSource.manager.findOne(Cliente, { where: { id: idCliente } });
    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${idCliente} no existe.`);
    }

    const venta = new Venta();
    venta.cliente = cliente;
    venta.fechaVenta = new Date();
    venta.total = ventaDetalleDto.reduce((acc, detalle) => acc + detalle.subTotal, 0);

    const detallesVenta = [];
    for (const detalleDto of ventaDetalleDto) {
      const producto = await this.dataSource.manager.findOne(Producto, { where: { id: detalleDto.idProducto } });
      if (!producto) {
        throw new NotFoundException(`El producto con id ${detalleDto.idProducto} no existe.`);
      }
      if (producto.stock < detalleDto.cantidad) {
        throw new NotFoundException(`Stock insuficiente para el producto ${producto.nombre}.`);
      }

      producto.stock -= detalleDto.cantidad;
      await this.dataSource.manager.save(producto);

      const detalle = new VentaDetalle();
      detalle.producto = producto;
      detalle.cantidad = detalleDto.cantidad;
      detalle.precioUnitario = detalleDto.precioUnitario;
      detalle.subTotal = detalleDto.subTotal;
      detallesVenta.push(detalle);
    }

    venta.detalles = detallesVenta;
    await this.ventaRepository.save(venta);

    return venta;
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`La venta con id ${id} no existe.`);
    }
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    // Lógica para actualizar una venta
  }

  async remove(id: number) {
    const result = await this.ventaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La venta con id ${id} no existe.`);
    }
  }
}
