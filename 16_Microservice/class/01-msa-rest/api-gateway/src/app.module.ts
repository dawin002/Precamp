import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE', // 그룹명
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3001 }, // 게이트웨이와 서비스를 똑같이 입력, host는 네임 리졸루션 사용해 연결
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: { host: 'resource-service', port: 3002 }, // 게이트웨이와 서비스를 똑같이 입력, host는 네임 리졸루션 사용해 연결
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
