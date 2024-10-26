import { Cliente } from "src/clientes/entities/cliente.entity";
import { DetallePedido } from "src/detalle-pedidos/entities/detalle-pedido.entity";
import { Empleado } from "src/empleados/entities/empleado.entity";
import { Pago } from "src/pagos/entities/pago.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
    fechaEliminacion: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
    cliente: Cliente;
    @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
    @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
    empleado: Empleado;
    @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
    detallePedidos: DetallePedido[];

    @OneToMany(() => Pago, (pago) => pago.pedido)
    pagos: Pago[];
}
