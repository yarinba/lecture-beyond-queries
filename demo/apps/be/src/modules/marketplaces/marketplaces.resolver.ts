import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MarketplacesService } from './marketplaces.service';
import { Marketplace } from './entities/marketplace.entity';

@Resolver(() => Marketplace)
export class MarketplacesResolver {
  constructor(private readonly marketplacesService: MarketplacesService) {}

  @Mutation(() => Marketplace)
  createMarketplace(@Args('name') name: string) {
    return this.marketplacesService.create({ name });
  }

  @Query(() => [Marketplace])
  marketplaces() {
    return this.marketplacesService.findAll();
  }

  @Query(() => Marketplace)
  marketplace(@Args('id', { type: () => ID }) id: string) {
    return this.marketplacesService.findOne(id);
  }

  @Mutation(() => Marketplace)
  removeMarketplace(@Args('id', { type: () => ID }) id: string) {
    return this.marketplacesService.remove(id);
  }
}
