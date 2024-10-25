import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('empleados')
export class Empleado {
    @PrimaryGeneratedColumn('identity')
    id: number;
  
    @Column('varchar', { length: 50 })
    nombre: string;
  
    @Column('varchar', { length: 50 })
    cargo: string;
  
    @Column('varchar', { length: 8 })
    celular: string;
  
    @Column('date', { name: 'fecha_contratacion', nullable: true })
    fechaContratacion: Date | null;
  
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;
}