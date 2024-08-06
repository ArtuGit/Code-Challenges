import { setTimeout } from "timers/promises";
import { Injectable } from '@nestjs/common';
import { ReposArgs } from 'src/recipes/dto/repos.args';
import { Repository } from 'src/recipes/models/repos.model';

@Injectable()
export class ReposService {
  async findAll(recipesArgs: ReposArgs): Promise<Repository[]> {
    return [] as Repository[];
  }
}
