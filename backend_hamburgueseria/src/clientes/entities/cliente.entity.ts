import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar', { length: 50 })
    nombre: string;

    @Column('varchar', { length: 50 })
    email: string;

    @Column('varchar', { length: 8 })
    celular: string;

    @Column('varchar', { length: 50 })
    direccion: string;
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[];
}
