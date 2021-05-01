import { ObjectType, Field } from '@nestjs/graphql';
import { IUser } from 'src/core/models/entities/IUser';
import { Base } from '../base';
import { Role } from './role';

@ObjectType()
export class User extends Base implements IUser {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  age: string;
  @Field(() => String)
  username: string;
  @Field(() => String)
  password?: string;
  @Field(() => Role)
  role: Role;
  @Field(() => Boolean)
  isActive: boolean;
  @Field(() => Boolean)
  isLockedOut: boolean;
  @Field(() => Boolean)
  isVerified: boolean;
}
