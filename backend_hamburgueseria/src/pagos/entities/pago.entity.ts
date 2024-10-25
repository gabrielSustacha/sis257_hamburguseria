import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
}
 