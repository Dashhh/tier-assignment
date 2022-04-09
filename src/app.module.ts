import { Module } from '@nestjs/common';
import { TierModule } from './tier/tier.module';

@Module({
  imports: [TierModule],
})
export class AppModule {}
