import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    const existe = await this.productoRepository.findOneBy({
      descripcion: createProductoDto.descripcion.trim(),
      precio: createProductoDto.precio,
    });
    if (existe) throw new ConflictException('El producto ya axixte');
    const producto = new Producto();
    producto.descripcion = createProductoDto.descripcion.trim();
    producto.precio = createProductoDto.precio,
    producto.stock = createProductoDto.stock || 0,
    producto.descuento = createProductoDto.descuento || 0
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({});
    if (!producto) throw new NotFoundException('el producto no existe');
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepository.softRemove(producto);
  }
}
