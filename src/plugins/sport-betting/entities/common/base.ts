import { Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export class Base extends Document {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  createdAt: string;
  @Field({ nullable: true })
  updatedAt: string;
}
