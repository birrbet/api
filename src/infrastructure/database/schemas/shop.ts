import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import {
  Contact,
  Location,
  IShop,
  ShopType,
} from 'src/core/models/entities/shop';
import { DocumentBase } from '../base-classes/document.base';
import { Schema as SchemaBase } from 'mongoose';
@Schema({ timestamps: true, id: true })
export class Shop extends DocumentBase implements IShop {
  @Prop({ type: String, required: true })
  branchName: string;
  @Prop({ type: Boolean, required: true })
  isActive: boolean;
  @Prop({ type: SchemaBase.Types.ObjectId })
  admin: string;
  @Prop({
    type: String,
    enum: ShopType,
    required: true,
    default: ShopType.branch,
  })
  type: ShopType;
  @Prop({ type: [Contact], default: [] })
  contacts: Contact[];
  @Prop({ type: Location })
  location: Location;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
