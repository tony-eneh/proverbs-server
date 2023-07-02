import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { PublicRoute } from '../auth/public-route.decorator';
import { formatUploadResponse } from 'src/helpers';

@PublicRoute()
@Controller('files')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      return formatUploadResponse(
        await this.awsService.upload(file.buffer, file.originalname),
      );
    } catch (err) {
      return err;
    }
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      const responses = files.map((file) =>
        this.awsService.upload(file.buffer, file.originalname),
      );
      return formatUploadResponse(await Promise.all(responses));
    } catch (err) {
      return err;
    }
  }
}
