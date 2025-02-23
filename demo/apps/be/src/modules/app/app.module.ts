import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/be/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/beyond-queries'),
    ProductsModule,
    MarketplacesModule,
  ],
})
export class AppModule {}
