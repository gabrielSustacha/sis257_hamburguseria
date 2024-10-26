import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallePedidosService {
  constructor(
    @InjectRepository(DetallePedido)
    private detallePedidoRepository: Repository<DetallePedido>,
  ) {}
  async create(createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    const existe = await this.detallePedidoRepository.findOneBy({
      cantidad: createDetallePedidoDto.cantidad,
    });

    if (existe) throw new ConflictException('El detalle de pedido ya existe');
    const detallePedido = this.detallePedidoRepository.create({
      cantidad: createDetallePedidoDto.cantidad,
      precioUnitario: createDetallePedidoDto.precioUnitario,
      subtotal: createDetallePedidoDto.subtotal,
    });

    return this.detallePedidoRepository.save(detallePedido);
  }

  async findAll(): Promise<DetallePedido[]> {
    return this.detallePedidoRepository.find();
  }

  async findOne(id: number) {
    const detallePedido = await this.detallePedidoRepository.findOne({where: { id }});
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
