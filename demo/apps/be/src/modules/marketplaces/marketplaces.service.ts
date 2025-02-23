import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Marketplace,
  MarketplaceDocument,
} from './entities/marketplace.entity';

@Injectable()
export class MarketplacesService {
  constructor(
    @InjectModel(Marketplace.name)
    private marketplaceModel: Model<MarketplaceDocument>
  ) {}

  async create(input: { name: string }): Promise<Marketplace> {
    return this.marketplaceModel.create(input);
  }

  async findAll(): Promise<Marketplace[]> {
    return this.marketplaceModel.find().exec();
  }

  async findOne(id: string): Promise<Marketplace> {
    return this.marketplaceModel.findById(id).exec();
  }

  async remove(id: string): Promise<Marketplace> {
    return this.marketplaceModel.findByIdAndDelete(id).exec();
  }
}
