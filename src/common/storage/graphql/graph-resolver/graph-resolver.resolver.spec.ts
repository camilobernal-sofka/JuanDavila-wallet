import { Test, TestingModule } from '@nestjs/testing';
import { GraphResolverResolver } from './graph-resolver.resolver';

describe('GraphResolverResolver', () => {
  let resolver: GraphResolverResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphResolverResolver],
    }).compile();

    resolver = module.get<GraphResolverResolver>(GraphResolverResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
