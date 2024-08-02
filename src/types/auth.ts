import { ApiProperty } from '@nestjs/swagger';

export interface JwtPayload {
  sub: string;
}

export class TokenDto {
  @ApiProperty({ example: 'refresh-token-example' })
  refresh_token: string;
  @ApiProperty({ example: 'refresh-token-example' })
  access_token: string;
}
