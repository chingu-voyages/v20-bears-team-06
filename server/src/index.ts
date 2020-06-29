import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './redis';
import { createSchema } from './utils/createSchema';
import { createServer } from 'http';


useContainer(Container);

const main = async () => {
  await createConnection();

  const schema = await createSchema();

 

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true,
    playground: true,
    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket) => {
        console.log(connectionParams)
        console.log(webSocket)
      }
    }
  });

  const app = Express();

  const RedisStore = connectRedis(session);
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://brave-einstein-04bd68.netlify.app'
          : 'http://localhost:3000',
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);


  const PORT = process.env.PORT || 4000;
  httpServer.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main();
