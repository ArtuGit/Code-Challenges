import { Injectable } from '@nestjs/common';
import { ReposArgs } from 'src/recipes/dto/repos.args';
import { Repository } from 'src/recipes/models/repos.model';

@Injectable()
export class ReposService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */
  async findOneById(id: string): Promise<Repository> {
    return {} as any;
  }

  async findAll(recipesArgs: ReposArgs): Promise<Repository[]> {
    return [] as Repository[];
  }
}
