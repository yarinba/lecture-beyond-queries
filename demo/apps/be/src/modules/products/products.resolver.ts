import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Float } from '@nestjs/graphql';
import { Marketplace } from '../marketplaces/entities/marketplace.entity';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly marketplacesService: MarketplacesService
  ) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('sku', { type: () => String }) sku: string,
    @Args('name', { type: () => String }) name: string,
    @Args('price', { type: () => Float }) price: number,
    @Args('description', { type: () => String, nullable: true })
    description: string | null,
    @Args('marketplaceId', { type: () => String }) marketplaceId: string,
    @Args('hasWarranty', { type: () => Boolean }) hasWarranty: boolean,
    @Args('tags', { type: () => [String] }) tags: string[]
  ): Promise<Product> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return this.productsService.create({
      sku,
      name,
      price,
      description,
      marketplaceId,
      metadata: {
        hasWarranty,
        tags,
      },
    });
  }

  @Mutation(() => Product)
  async updateProductName(
    @Args('sku', { type: () => String }) sku: string,
    @Args('name', { type: () => String }) name: string
  ): Promise<Product | null> {
    const updatedProduct = await this.productsService.updateProductName(
      sku,
      name
    );

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('sku', { type: () => String }) sku: string
  ): Promise<boolean> {
    return this.productsService.delete(sku);
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(
    @Args('sku', { type: () => String }) sku: string
  ): Promise<Product | null> {
    return this.productsService.findOne(sku);
  }

  @ResolveField(() => Marketplace)
  async marketplace(@Parent() product: Product) {
    return this.marketplacesService.findOne(product.marketplaceId);
  }
}
