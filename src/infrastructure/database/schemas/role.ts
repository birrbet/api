import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRole } from 'src/core/models/entities/iRole';
import { DocumentBase } from 'src/infrastructure/database/base-classes/document.base';

@Schema({ timestamps: true, id: true })
export class Role extends DocumentBase implements IRole {
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: [String], default: [] })
  permissions: string[];
  @Prop({ type: String, required: true, unique: true })
  normalizedName: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
