import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Marketplace } from '../../marketplaces/entities/marketplace.entity';
import {
  ProductMetadata,
  ProductMetadataSchema,
} from './product-metadata.object';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
@ObjectType()
export class Product {
  @Prop({ index: { unique: true } })
  @Field(() => String)
  sku: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  description: string | null;

  @Prop()
  @Field(() => Float)
  price: number;

  @Prop({ type: ProductMetadataSchema, schema: ProductMetadataSchema })
  @Field(() => ProductMetadata)
  metadata: ProductMetadata;

  @Prop({ type: String, ref: Marketplace.name })
  marketplaceId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
