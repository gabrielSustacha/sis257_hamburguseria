import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';

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
      cliente: { id: createPedidoDto.idCliente },
    });
    if (existe) throw new ConflictException('El pedido ya axixte');
    const pedido = new Pedido();
    pedido.metodoPago = createPedidoDto.metodoPago.trim();
    pedido.estado = createPedidoDto.estado;
    pedido.cliente = { id: createPedidoDto.idCliente } as Cliente;
    if (createPedidoDto.idEmpleado) {
      pedido.empleado = { id: createPedidoDto.idEmpleado } as Empleado;
    }
    return this.pedidoRepository.save(pedido);
  }
  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ relations: ['cliente', 'empleado'] });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({where: { id }, relations: ['cliente', 'empleado'],});
    if (!pedido) throw new NotFoundException('el pedido no existe');
    return pedido;
  }

  async update(
    id: number,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<Pedido> {
    const pedido = await this.findOne(id);
    const pedidoUpdate = Object.assign(pedido, updatePedidoDto);
    pedido.cliente = { id: updatePedidoDto.idCliente } as Cliente;
    pedido.empleado = { id: updatePedidoDto.idEmpleado } as Empleado;
    return this.pedidoRepository.save(pedidoUpdate);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidoRepository.softRemove(pedido);
  }
}
