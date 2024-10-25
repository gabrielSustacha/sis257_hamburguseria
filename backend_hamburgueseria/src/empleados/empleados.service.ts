import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  clienteRepository: any;
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}
  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOne({
      where: {
        nombre: createEmpleadoDto.nombre.trim(),
        cargo: createEmpleadoDto.cargo.trim(),
        celular: createEmpleadoDto.celular.trim(),

      },
    });

    if (existe) {
      throw new ConflictException('El empleado ya existe');
    }

    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.cargo = createEmpleadoDto.cargo.trim();
    empleado.celular = createEmpleadoDto.celular.trim();
    empleado.fechaContratacion = createEmpleadoDto.fechaContratacion;
    return this.empleadosRepository.save(empleado);
  }

 
  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const usuario = await this.empleadosRepository.findOne({});
    if (!usuario) throw new NotFoundException('el usuario no existe');
    return usuario;
  }


  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const cliente = await this.findOne(id);
    const clienteUpdate = Object.assign(cliente, updateEmpleadoDto);
    return this.clienteRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    return this.clienteRepository.softRemove(cliente);
  }
}
