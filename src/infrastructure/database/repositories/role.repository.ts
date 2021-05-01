import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../schemas/role';
import { BaseRepository } from './base.repository';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {
    super(roleModel);
  }
}
