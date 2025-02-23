import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarketplaceDocument = HydratedDocument<Marketplace>;

@Schema()
@ObjectType()
export class Marketplace {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;
}

export const MarketplaceSchema = SchemaFactory.createForClass(Marketplace);
