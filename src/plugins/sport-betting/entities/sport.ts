import { Field } from '@nestjs/graphql';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Base } from './common/base';
import { ILockable } from './common/lockable';
import { IOrderable } from './common/orderable';
import { Country } from './country';
import { Schema as SchemaBase } from 'mongoose';

@Schema({ timestamps: true })
export class Sport extends Base implements ILockable, IOrderable {
  @Field(() => Number, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  order: number;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ type: Boolean, default: false })
  isLocked: boolean;

  @Field(() => String)
  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  displayName: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  icon?: string;

  @Field(() => [Country], { defaultValue: [] })
  @Prop({ type: [SchemaBase.Types.ObjectId], ref: 'countries', default: [] })
  countries: string[] | Country[];
}

export const SportSchema = SchemaFactory.createForClass(Sport);
