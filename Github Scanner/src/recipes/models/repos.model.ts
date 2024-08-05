import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'repo' })
export class Repository {
  @Field(type => String)
  name: string;

  @Field(type => Number)
  size: number;

  @Field(type => String)
  owner: string;

  @Field(type => Boolean)
  isPrivate: boolean;

  @Field(type => Number)
  numberOfFiles: number;
}
