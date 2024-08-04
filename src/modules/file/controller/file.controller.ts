import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthToken } from 'decorators/auth.decorator';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'types/role';
import { DecodedUserToken } from 'utils/parseCookie';
import { FileService } from '../service/file.service';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file on S3',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'File uploaded successfully',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  uploadFile(
    @AuthToken() { sub }: DecodedUserToken,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.upload(sub, file);
  }

  @Get(':fileName')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User file retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User file not found',
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @CacheKey('get_file_key')
  @CacheTTL(5)
  getFile(@Param('fileName') fileName: string) {
    return this.fileService.get(fileName);
  }
}
