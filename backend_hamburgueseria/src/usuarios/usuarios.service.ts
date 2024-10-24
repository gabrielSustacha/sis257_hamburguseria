import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
      clave: createUsuarioDto.clave.trim(),
    });
    if (existe) throw new ConflictException('El usuario ya axixte');

    const usuario1 = new Usuario();
    usuario1.usuario = createUsuarioDto.usuario.trim();
    usuario1.clave = createUsuarioDto.clave.trim();
    usuario1.email = createUsuarioDto.email.trim();
    usuario1.rol = createUsuarioDto.rol.trim();
    return this.usuarioRepository.save(usuario1);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({});
    if (!usuario) throw new NotFoundException('el usuario no existe');
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.softRemove(usuario);
  }
}
