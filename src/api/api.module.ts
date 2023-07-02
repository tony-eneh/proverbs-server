import { Module } from '@nestjs/common';
import { ProverbsModule } from './proverbs/proverbs.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [ProverbsModule, AuthModule, UserModule, AwsModule],
})
export class ApiModule {}
