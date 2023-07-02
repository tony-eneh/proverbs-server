import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { PublicRoute } from '../auth/public-route.decorator';

@PublicRoute()
@Controller('files')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log({ file });
    try {
      return this.awsService.upload(file.buffer, file.originalname);
    } catch (err) {
      return err;
    }
  }
}
