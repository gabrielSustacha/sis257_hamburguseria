import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const existe = await this.pedidoRepository.findOneBy({
      metodoPago: createPedidoDto.metodoPago.trim(),
      estado: createPedidoDto.estado,
    });
    if (existe) throw new ConflictException('El pedido ya axixte');
    const pedido = new Pedido();
    pedido.metodoPago = createPedidoDto.metodoPago.trim();
    pedido.estado = createPedidoDto.estado;
    return this.pedidoRepository.save(pedido);
  }
  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({where: { id }});
    if (!pedido) throw new NotFoundException('el pedido no existe');
    return pedido;
  }

  async update(
    id: number,
    updateProductoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    const pedido = await this.findOne(id);
    const pedidoUpdate = Object.assign(pedido, updateProductoDto);
    return this.pedidoRepository.save(pedidoUpdate);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidoRepository.softRemove(pedido);
  }
}
