import {
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { GenericController } from 'src/common/decorators/controller.decorator';
import {
  imageFileFilter,
  videoFileFilter,
} from 'src/common/filters/file.filter';

@GenericController('uploads')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './uploads/image',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `/image_${uuidv4()}.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  public uploadImage(@UploadedFile() image: Express.Multer.File) {
    const baseUrl = this.configService.get<string>('BASE_API_URL');
    const relativeUrl = `uploads/image${image.filename}`;
    const absoluteUrl = `${baseUrl}/${relativeUrl}`;

    const data = {
      absoluteUrl,
      relativeUrl,
      original_name: image.originalname,
      generate_name: image.filename,
    };

    return data;
  }

  @Post('multipart-image')
  @UseInterceptors(
    FileInterceptor('images', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './uploads/image',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `/image_${uuidv4()}.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  public uploadMultipleImages(@UploadedFiles() images: Express.Multer.File[]) {
    const baseUrl = this.configService.get<string>('BASE_API_URL');
    const uploadedImages = images.map((image) => {
      const relativeUrl = `uploads/image${image.filename}`;
      const absoluteUrl = `${baseUrl}/api/v1/${relativeUrl}`;

      return {
        absoluteUrl,
        relativeUrl,
        original_name: image.originalname,
        generate_name: image.filename,
        image,
      };
    });

    return uploadedImages;
  }

  @Post('video')
  @UseInterceptors(
    FileInterceptor('video', {
      fileFilter: videoFileFilter,
      storage: diskStorage({
        destination: './uploads/video',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `/video_${uuidv4()}.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  public uploadVideo(@UploadedFile() video: Express.Multer.File) {
    const relativeUrl = `solution-file${video.filename}`;
    const absoluteUrl = `${process.env.BASE_URL}/${relativeUrl}`;

    const data = {
      absoluteUrl,
      relativeUrl,
      original_name: video.originalname,
      generate_name: video.filename,
    };
    return data;
  }
}
