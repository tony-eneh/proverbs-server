import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private readonly configService: ConfigService) {}

  bucket = this.configService.getOrThrow('AWS_S3_BUCKET');
  s3 = new S3({
    accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
    secretAccessKey: this.configService.getOrThrow('AWS_ACCESS_SECRET'),
  });

  async upload(file: Buffer, fileName: string) {
    console.log({
      bucket: this.bucket,
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_ACCESS_SECRET'),
    });
    const apiResponse = await this.s3
      .upload({
        Body: file,
        Bucket: this.bucket,
        // ACL: 'public-read',
        Key: fileName,
        ContentDisposition: 'inline',
      })
      .promise();
    console.log({ apiResponse });
    return apiResponse;
  }
}
