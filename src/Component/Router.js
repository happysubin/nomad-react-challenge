import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SearchBox from "../Screen/Search";
import TvBox from "../Screen/Tv";
import MovieBox from "../Screen/Movie";
import Header from "./Header";

const HomeRouter = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={MovieBox} />
      <Route path="/tv" component={TvBox} />
      <Route path="/search" component={SearchBox} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default HomeRouter;
