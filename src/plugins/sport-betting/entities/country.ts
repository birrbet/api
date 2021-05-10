import { ILockable } from './common/lockable';
import { IOrderable } from './common/orderable';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Base } from './common/base';
import { League } from './league';
import { Schema as SchemaBase } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Country extends Base implements ILockable, IOrderable {
  @Field(() => Number, { defaultValue: 0 })
  @Prop({ type: Number, default: 0 })
  order: number;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ type: Boolean, default: false })
  isLocked: boolean;

  @Field(() => String)
  @Prop({ type: String, required: [true, "Country's id is required"] })
  id: string; // id comes from api provider

  @Field(() => String)
  @Prop({ type: String, required: [true, "Country's name is required"] })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  displayName: string; // default same as the name, but later can be changed as user's preference

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  code?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  flag?: string;

  @Field(() => League, { defaultValue: [] })
  @Prop({ type: [SchemaBase.Types.ObjectId], ref: 'leagues', default: [] })
  leagues: string[] | League[];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
