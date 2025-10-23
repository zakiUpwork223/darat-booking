import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors:true})
export class WebsocketGateway //implements //OnGatewayConnection //,OnGatewayDisconnect
 {
 
  @WebSocketServer() server: Server;

  @SubscribeMessage('apna')
  create() {
    return "inside gateway heello"
  }

  sendMessage(id : string ,payload:any){ // i need to only emit messages
    console.log("\n inside payment \n");
    
    
    this.server.emit(`intentCreated${id}` , payload)
  }

  paymentStatus(id : string , payload:any){ // to notify about payment completed successfully
    this.server.emit(`paymentStatus${id}` , payload)
  }

  appointmentStatus(id : string , payload:any){ // to notify about appointment status
    this.server.emit(`appointmentStatus${id}` , payload)
  }

  sendMessage1(){
    this.server.emit('newMessage1' , "hello from the server side1")
  }
  
}
