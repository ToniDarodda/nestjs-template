import { Module } from '@nestjs/common';
import { WebSocketService } from './services/web-socket.service';

@Module({
  providers: [WebSocketService],
})
export class WebSocketModule {}
