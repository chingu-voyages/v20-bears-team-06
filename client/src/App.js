import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.scss";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://chingu-bears-06.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  credentials: "include",
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
  
  let theme = createMuiTheme({
    typography:{
      body2: {
        fontSize: '0.75rem'
      },
      caption: {
        fontSize: '.8rem'
      }
    }
  });
  theme = responsiveFontSizes(theme,6);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="App">
          <Header />
          <Switch>
            <MuiThemeProvider theme={theme}>
            <Route exact path="/profile/:userid/edit" component={EditPage} />
            <Route path="/profile/:userid" component={ProfilePage} />
            </MuiThemeProvider>
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
