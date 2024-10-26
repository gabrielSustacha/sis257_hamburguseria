import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()
export class DetallePedidosService {
  constructor(
    @InjectRepository(DetallePedido)
    private detallePedidoRepository: Repository<DetallePedido>,
  ) {}
  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const existe = await this.detallePedidoRepository.findOneBy({
      cantidad: createDetallePedidoDto.cantidad,
      producto: { id: createDetallePedidoDto.idProducto },
      pedido: { id: createDetallePedidoDto.idPedido },
    });

    if (existe) {
      throw new ConflictException('El detalle de pedido ya existe');
    }

    const detallePedido = new DetallePedido();
    detallePedido.cantidad = createDetallePedidoDto.cantidad;
    detallePedido.precioUnitario = createDetallePedidoDto.precioUnitario;
    detallePedido.subtotal = createDetallePedidoDto.subtotal;
    detallePedido.producto = { id: createDetallePedidoDto.idProducto } as Producto;
    detallePedido.pedido = { id: createDetallePedidoDto.idPedido } as Pedido;

    return this.detallePedidoRepository.save(detallePedido);
}
  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find({relations: ['producto', 'pedido'],});
  }

  async findOne(id: number) {
    const detallePedido = await this.detallePedidoRepository.findOne({where: { id },relations: ['producto', 'pedido']});
    if (!detallePedido) throw new NotFoundException('el detalle del pedido no existe');
    return detallePedido;
  }

  async update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto): Promise<DetallePedido> {
    const detallePedido = await this.findOne(id);
    const detallePedidoUpdate = Object.assign(detallePedido, updateDetallePedidoDto);
    return this.detallePedidoRepository.save(detallePedido);
  }

  async remove(id: number) {
    const detallePedido = await this.findOne(id);
    return this.detallePedidoRepository.softRemove(detallePedido);
  }
}
