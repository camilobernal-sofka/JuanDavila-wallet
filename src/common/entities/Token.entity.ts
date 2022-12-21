import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Client } from './Client.entity';

@Index('token_cli_id_Idx', ['cliId'], {})
@Index('pktoken', ['tokId'], { unique: true })
@Entity('token', { schema: 'public' })
export class Token {
  @Column('uuid', { primary: true, name: 'tok_id' })
  tokId: string;

  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @Column('character varying', { name: 'tok_token', length: 500 })
  tokToken: string;

  @Column('timestamp without time zone', { name: 'tok_fecha_expiracion' })
  tokFechaExpiracion: Date;

  @ManyToOne(() => Client, (client) => client.tokens, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'cliId' }])
  cli: Client;
}
