import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerModuleOptions } from 'src/config/multer.config';

@Module({
  imports: [MulterModule.registerAsync(multerModuleOptions)],
  controllers: [UploadController],
  providers: [UploadController],
})
export class UploadModule {}
