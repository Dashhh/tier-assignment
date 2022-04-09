import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TierModule } from './tier/tier.module';

@Module({
  imports: [TierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
