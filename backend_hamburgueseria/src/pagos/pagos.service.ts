import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}
  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const existe = await this.pagoRepository.findOneBy({
      monto: createPagoDto.monto,
      total: createPagoDto.total,
    
    });
    if (existe) throw new ConflictException('El pago ya existe');

    const pago = new Pago();
    pago.monto = createPagoDto.monto;
    pago.total = createPagoDto.total;
    pago.fechaPago = new Date();
    return this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepository.find();
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOne({where: { id }});
    if (!pago) throw new NotFoundException('el pago no existe');
    return pago;
  }

 async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);
    const pagoUpdate = Object.assign(pago, updatePagoDto);
    return this.pagoRepository.save(pagoUpdate);
  }

  async remove(id: number) {
    const pago = await this.findOne(id);
    return this.pagoRepository.softRemove(pago);
  }
}
