import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import ButtonAppBar from "./components/Navbar";
import Home from "./containers/Home";
import Feeds from "./containers/Feeds";
import Articles from "./containers/Articles";
import ArticleDetail from "./containers/ArticleDetail";
import Register from "./containers/Register";
import PrivateRoute from "./components/Private";

function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/feeds" component={Feeds} />
            <PrivateRoute path="/articles" exact component={Articles} />
            <PrivateRoute path="/articles/:id" component={ArticleDetail} />
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
