import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(sku: string): Promise<Product | null> {
    return this.productModel.findOne({ sku }).exec();
  }

  async create(input: Product): Promise<Product> {
    return this.productModel.create(input);
  }

  async updateProductName(sku: string, name: string): Promise<Product | null> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ sku }, { name }, { new: true })
      .exec();
    return updatedProduct;
  }

  async delete(sku: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({ sku }).exec();
    return result.deletedCount === 1;
  }
}
