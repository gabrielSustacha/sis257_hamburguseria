import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @ManyToOne(() => Usuario, (usuario) => usuario.empleado)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
    @OneToMany(() => Pedido, (pedido) => pedido.empleado)
    pedidos: Pedido[];
}
