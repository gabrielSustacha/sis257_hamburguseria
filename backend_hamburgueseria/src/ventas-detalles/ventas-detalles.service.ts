import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { VentaDetalle } from './entities/ventas-detalle.entity';
import { CreateVentaDetalleDto } from './dto/create-ventas-detalle.dto';
import { UpdateVentasDetalleDto } from './dto/update-ventas-detalle.dto';

@Injectable()
export class VentasDetalleService {
  constructor(
    @InjectRepository(VentaDetalle)
    private readonly ventasDetalleRepository: Repository<VentaDetalle>,
    
  ) {}

  async update(id: number, updateVentaDetalleDto: UpdateVentasDetalleDto): Promise<VentaDetalle> {
    const ventaDetalle = await this.ventasDetalleRepository.findOne({ where: { id } });
    
    if (!ventaDetalle) {
      throw new NotFoundException('Venta Detalle no encontrada');
    }

    Object.assign(ventaDetalle, updateVentaDetalleDto);
    return this.ventasDetalleRepository.save(ventaDetalle);
  }
 

  async create(createVentaDetalleDto: CreateVentaDetalleDto) {
    const producto = await this.ventasDetalleRepository.manager.findOne(Producto, { where: { id: createVentaDetalleDto.idProducto } });
    if (!producto) {
      throw new NotFoundException(`El producto con id ${createVentaDetalleDto.idProducto} no existe.`);
    }

    const ventaDetalle = new VentaDetalle();
    ventaDetalle.producto = producto;
    ventaDetalle.cantidad = createVentaDetalleDto.cantidad;
    ventaDetalle.precioUnitario = createVentaDetalleDto.precioUnitario;
    ventaDetalle.total = createVentaDetalleDto.total;

    return this.ventasDetalleRepository.save(ventaDetalle);
  }

  async findAll(): Promise<VentaDetalle[]> {
    return this.ventasDetalleRepository.find({ relations: ['producto'] });
  }

  async findOne(id: number) {
    const detalle = await this.ventasDetalleRepository.findOne({ where: { id }, relations: ['producto'] });
    if (!detalle) {
      throw new NotFoundException(`El detalle de venta con id ${id} no existe.`);
    }
    return detalle;
  }

  async remove(id: number) {
    const detalle = await this.findOne(id);
    return this.ventasDetalleRepository.remove(detalle);
  }
}
