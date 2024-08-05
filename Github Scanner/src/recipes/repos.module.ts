import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { ReposResolver } from 'src/recipes/repos.resolver';
import { ReposService } from 'src/recipes/repos.service';

@Module({
  providers: [ReposResolver, ReposService, DateScalar],
})
export class ReposModule {}
