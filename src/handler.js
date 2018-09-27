'use strict';

import { ApolloServer } from 'apollo-server-lambda';
import schema from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: true
});

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
