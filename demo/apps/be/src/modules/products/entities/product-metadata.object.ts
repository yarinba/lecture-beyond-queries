import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductMetadataDocument = HydratedDocument<ProductMetadata>;

@Schema({ _id: false })
@ObjectType()
export class ProductMetadata {
  @Prop()
  @Field(() => Boolean)
  hasWarranty: boolean;

  @Prop()
  @Field(() => [String])
  tags: string[];
}

export const ProductMetadataSchema =
  SchemaFactory.createForClass(ProductMetadata);
