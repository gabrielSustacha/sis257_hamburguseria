import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pagos')
export class Pago {
    @PrimaryGeneratedColumn('identity')
    id: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    total: number;
  
    @Column({ name: 'fecha_pago' })
    fechaPago: Date;
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
    @ManyToOne(() => Pedido, (pedido) => pedido.pagos)
    @JoinColumn({ name: 'id_interprete', referencedColumnName: 'id' })
    pedido: Pedido;
  
}
 