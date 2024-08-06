import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ReposArgs } from 'src/recipes/dto/repos.args';
import { Repository } from 'src/recipes/models/repos.model';
import { ReposService } from 'src/recipes/repos.service';

const pubSub = new PubSub();

@Resolver(of => Repository)
export class ReposResolver {
  constructor(private readonly reposService: ReposService) {}

  @Query(returns => [Repository])
  repos(@Args() recipesArgs: ReposArgs): Promise<Repository[]> {
    return this.reposService.findAll(recipesArgs);
  }
}
