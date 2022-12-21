import { Args, Query, Resolver } from '@nestjs/graphql';
import { Client } from '../../../../../database2/entities/Client';

@Resolver()
export class GraphResolverResolver {
  @Query(() => String)
  ClientResolver(
    @Args('client', { type: () => String }) client: Client,
  ): string[] {
    const listClient = [client.cliFullName, client.cliEmail];
    return listClient;
  }
}
