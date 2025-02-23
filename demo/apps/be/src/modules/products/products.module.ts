import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MarketplacesModule,
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
