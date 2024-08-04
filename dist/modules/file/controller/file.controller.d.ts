import { DecodedUserToken } from 'utils/parseCookie';
import { FileService } from '../service/file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile({ sub }: DecodedUserToken, file: Express.Multer.File): Promise<string>;
    getFile({ sub }: DecodedUserToken): Promise<string>;
}
