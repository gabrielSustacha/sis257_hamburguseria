import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      // usuario: { id: createEmpleadoDto.idUsuario },
    });

    if (existe) {
      throw new ConflictException('El empleado ya existe');
    }

    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.apellido = createEmpleadoDto.apellido.trim();
    empleado.cargo = createEmpleadoDto.cargo.trim();
    empleado.celular = createEmpleadoDto.celular.trim();
    empleado.fechaContratacion = createEmpleadoDto.fechaContratacion;
    // empleado.usuario = { id: createEmpleadoDto.idUsuario } as Usuario;
    
    return this.empleadosRepository.save(empleado);
  }
  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Empleado> {
    const usuario = await this.empleadosRepository.findOne({ where: { id }, relations: ['usuario']  });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    const empleadoUpdate = Object.assign(empleado, updateEmpleadoDto);
    
    return this.empleadosRepository.save(empleadoUpdate);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    
    return this.empleadosRepository.softRemove(empleado);
  }
}
