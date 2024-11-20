import { Empleado } from "src/empleados/entities/empleado.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  usuario: string;

  @Column('varchar', { length: 10 })
  clave: string;

 

 
  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro: Date;
 
  @OneToMany(() => Empleado, (Empleado) => Empleado.usuario)
  empleado: Empleado[];
}
