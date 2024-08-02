export interface JwtPayload {
    sub: string;
}
export declare class TokenDto {
    refresh_token: string;
    access_token: string;
}
