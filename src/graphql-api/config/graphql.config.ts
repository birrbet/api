import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
@Injectable()
export class GraphqlConfig implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions | Promise<GqlModuleOptions> {
    return {
      path: '/',
      subscriptions: '/',
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      debug: true,
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
    };
  }
}
