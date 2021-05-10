import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './common/base';
import { ILockable } from './common/lockable';
import { IOrderable } from './common/orderable';

@ObjectType()
@Schema({ timestamps: true })
export class Market extends Base implements ILockable, IOrderable {
  @Field((type) => String)
  @Prop({ index: true, unique: true })
  id: string;

  @Field((type) => String)
  @Prop({ index: true, unique: true })
  name: string;

  @Field(() => Number, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  order: number;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ type: Boolean, default: false })
  isLocked: boolean;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
