import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaBase } from 'mongoose';
import { ObjectLiteral } from 'src/core/types/object-literal.type';
import { DocumentBase } from '../base-classes/document.base';
export class MetaData implements ObjectLiteral {
  [key: string]: unknown;
}
@Schema({ timestamps: true })
export class Wallet extends DocumentBase {
  @Prop({
    type: SchemaBase.Types.ObjectId,
    unique: true,
    index: true,
    required: true,
    ref: 'users',
  })
  user: string;
  @Prop({ type: Number })
  balance: number;
  @Prop({ type: MetaData })
  metadata: MetaData;
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
