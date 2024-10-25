import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn('identity')
    id: number;
  
    @Column('varchar', { length: 50 })
    metodoPago: string;
  
    @Column('varchar', { length: 20 })
    estado: string;

    @CreateDateColumn({ name: 'fecha_pedido' })
    fechaPedido: Date;
}
