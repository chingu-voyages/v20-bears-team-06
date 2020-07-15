import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { split, ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "@apollo/react-hooks";
import { config } from "dotenv";
import App from "./App";
import { resolvers, typeDefs } from "./graphql/Resolvers";
import { gql } from "apollo-boost";

config();

const graphqlUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : "https://chingu-bears-06.herokuapp.com/graphql";

const wsUrl =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:4000/subscriptions"
    : "wss://chingu-bears-06.herokuapp.com/subscriptions";

const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: "include",
});

const subClient = new SubscriptionClient(wsUrl, {
  reconnect: true,
  lazy: true,
  credentials: "include"  
});

subClient.maxConnectTimeGenerator.setMin(3000);
const wsLink = new WebSocketLink(subClient,{
  uri: wsUrl,
  credentials:"include"
});


{/*const wsLink = new WebSocketLink({
  uri: wsUrl,
  credentials: "include",
  options: {
    reconnect: true,
    lazy: true
  },
}); */}


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: splitLink,
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
  cache: cache,
  connectToDevTools: true
});
client.writeData({ data: { me: null } });



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
