# Run independent process in queue for better performance
- Handling CPU-intensive operations

```
import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './image.processor';
 
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    })
  ],
  providers: [ImageProcessor],
  exports: [],
  controllers: [OptimizeController]
})
export class OptimizeModule {}


import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
 
@Controller('optimize')
export class OptimizeController {
  constructor(
    @InjectQueue('image') private readonly imageQueue: Queue,
  ) {}
 
  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async processImage(@UploadedFiles() files: Express.Multer.File[]) {
    const job = await this.imageQueue.add('optimize', {
      files
    });
 
    return {
      jobId: job.id
    }
  }

    @Get('image/:id')
  async getJobResult(@Res() response: Response, @Param('id') id: string) {
    const job = await this.imageQueue.getJob(id);
 
    if (!job) {
      return response.sendStatus(404);
    }
 
    const isCompleted = await job.isCompleted();
 
    if (!isCompleted) {
      return response.sendStatus(202);
    }
 
    const result = Buffer.from(job.returnvalue);
 
    const stream = Readable.from(result);
 
    stream.pipe(response);
  }
}


import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as AdmZip from 'adm-zip';
import { buffer } from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { Express } from 'express';
 
@Processor('image')
export class ImageProcessor {
  @Process('optimize')
  async handleOptimization(job: Job) {
    const files: Express.Multer.File[] = job.data.files;
 
    const optimizationPromises: Promise<Buffer>[] = files.map(file => {
      const fileBuffer = Buffer.from(file.buffer);
      return buffer(fileBuffer, {
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      })
    })
 
    const optimizedImages = await Promise.all(optimizationPromises);
 
    const zip = new AdmZip();
 
    optimizedImages.forEach((image, index) => {
      const fileData = files[index];
      zip.addFile(fileData.originalname, image);
    })
 
    return zip.toBuffer();
  }
  // we could update the progress of the job by calling the job.progress(number) method when we finish up optimizing some of the images.
}
```


run the job in separate process 
example

```
import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
 
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [{
        name: 'optimize',
        path: join(__dirname, 'image.processor.js')
      }],
    })
  ],
  providers: [],
  exports: [],
  controllers: [OptimizeController]
})
export class OptimizeModule {}



import * as AdmZip from 'adm-zip';
import { buffer } from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { Express } from 'express';
import { Job, DoneCallback } from 'bull';
 
async function imageProcessor(job: Job, doneCallback: DoneCallback) {
  const files: Express.Multer.File[] = job.data.files;
 
  const optimizationPromises: Promise<Buffer>[] = files.map(file => {
    const fileBuffer = Buffer.from(file.buffer);
    return buffer(fileBuffer, {
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    })
  })
 
  const optimizedImages = await Promise.all(optimizationPromises);
 
  const zip = new AdmZip();
 
  optimizedImages.forEach((image, index) => {
    const fileData = files[index];
    zip.addFile(fileData.originalname, image);
  })
 
  doneCallback(null, zip.toBuffer());
}
 
export default imageProcessor;
```