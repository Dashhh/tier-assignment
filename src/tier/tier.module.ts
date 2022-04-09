import { CacheModule, Module } from '@nestjs/common';
import { TierService } from './tier.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [TierService],
  exports: [TierService],
})
export class TierModule {}
