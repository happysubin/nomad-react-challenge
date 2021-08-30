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
import Detail from "../Screen/Detail";

const HomeRouter = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={MovieBox} />
      <Route path="/tv" component={TvBox} />
      <Route path="/search" component={SearchBox} />
      <Route path="/show/:id" exact component={Detail} />
      <Route path="/movie/:id" exact component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default HomeRouter;
