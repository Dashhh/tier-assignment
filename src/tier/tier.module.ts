import { Module } from '@nestjs/common';
import { TierService } from './tier.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TierService],
})
export class TierModule {}