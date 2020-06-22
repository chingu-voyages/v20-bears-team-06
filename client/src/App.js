import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./App.scss";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://chingu-bears-06.herokuapp.com/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
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
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <Route exact path="/profile/:userid/edit" component={EditPage} />
            <Route path="/profile/:userid" component={ProfilePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}
