import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import { ProfilePage } from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSubscription } from '@apollo/react-hooks';
import { FOLLOWER_SUB } from './graphql/Subscriptions';
import { UploadExample } from "./components/UploadExample";
import "./App.scss";

export default function App({ client }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let theme = createMuiTheme({
    typography: {
      body2: {
        fontSize: "0.75rem",
      },
      caption: {
        fontSize: ".8rem",
      },
    },
  });
  theme = responsiveFontSizes(theme, 6);
  return (
    <Router>
      <div id="App">
        <Header
          setLoggedIn={setLoggedIn}
          isLoggedIn={isLoggedIn}
          client={client}
        />
        <Switch>
          {/* <ThemeProvider theme={theme}> */}
          <Route exact path="/profile/:userId/edit" component={EditPage} />
          <Route path="/profile/:userId" component={ProfilePage} />
          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterPage
                {...props}
                setLoggedIn={setLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage
                {...props}
                setLoggedIn={setLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route exact path="/upload" component={UploadExample} />
          <Route exact path="/" component={Home} />
          {/* </ThemeProvider> */}
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
