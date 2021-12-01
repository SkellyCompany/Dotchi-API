import { OnGatewayConnection } from '@nestjs/websockets';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { SocketClient } from 'src/clients/socket.client';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection {
	constructor(
		private socketClient: SocketClient
	) { }

	@WebSocketServer() server: Server

	afterInit(server: Server) {
		this.socketClient.server = server
	}

	handleConnection(client: Socket, ...args: any[]) {

	}
}
