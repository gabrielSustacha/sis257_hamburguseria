import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) {}

    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        const existe = await this.categoriaRepository.findOneBy({
            nombre: createCategoriaDto.nombre.trim(),
        });
        
        if (existe) throw new ConflictException('La categoría ya existe');
        const categoria = new Categoria();
        categoria.nombre = createCategoriaDto.nombre.trim();
        categoria.descripcion = createCategoriaDto.descripcion?.trim();

        return this.categoriaRepository.save(categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find();
    }

    async findOne(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({ where: { id } });
        if (!categoria) throw new NotFoundException('La categoría no existe');
        return categoria;
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDto){
        const categoria = await this.findOne(id);
        const categoriaUpdate = Object.assign(categoria, updateCategoriaDto);
        
        return this.categoriaRepository.save(categoriaUpdate);
    }

    async remove(id: number) {
      const categoria = await this.findOne(id);
      return this.categoriaRepository.softRemove(categoria);
    }
}