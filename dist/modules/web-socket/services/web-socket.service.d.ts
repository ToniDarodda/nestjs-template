import { Server } from 'socket.io';
export declare class WebSocketService {
    server: Server;
    handleMessage(message: string): void;
}
