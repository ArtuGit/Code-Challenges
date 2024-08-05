import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ReposArgs } from 'src/recipes/dto/repos.args';
import { Repository } from 'src/recipes/models/repos.model';
import { ReposService } from 'src/recipes/repos.service';

const pubSub = new PubSub();

@Resolver(of => Repository)
export class ReposResolver {
  constructor(private readonly recipesService: ReposService) {}

  @Query(returns => Repository)
  async recipe(@Args('id') id: string): Promise<Repository> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [Repository])
  recipes(@Args() recipesArgs: ReposArgs): Promise<Repository[]> {
    return this.recipesService.findAll(recipesArgs);
  }
}
