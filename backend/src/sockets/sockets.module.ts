import { Module } from '@nestjs/common';
//import { SocketsService } from './sockets.service';
//import { SocketsGateway } from './sockets.gateway';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [ //SocketsService ,
     WebsocketGateway],
  exports:[WebsocketGateway]
})
export class SocketsModule {}
