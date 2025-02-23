import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketplacesService } from './marketplaces.service';
import { MarketplacesResolver } from './marketplaces.resolver';
import { Marketplace, MarketplaceSchema } from './entities/marketplace.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Marketplace.name, schema: MarketplaceSchema },
    ]),
  ],
  providers: [MarketplacesResolver, MarketplacesService],
  exports: [MarketplacesService],
})
export class MarketplacesModule {}
