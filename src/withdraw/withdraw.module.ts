import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from './entites/withdraw.entity';
import { WithdrawController } from './withdraw.controller';
import { WithdrawService } from './withdraw.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Withdraw]),
    ClientsModule.register([
      {
        name: "ACCOUNT_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "account",
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'account-consumer'
          }
        }
      }
    ]),
  ],
  controllers: [WithdrawController],
  providers: [WithdrawService]
})
export class WithdrawModule { }
