// Setups
import React                                                                from "react";
import ReactDOM                                                             from "react-dom";
import Welcome                                                              from "./components/welcome";
import App                                                                  from "./components/app";
import Register                                                             from "./components/register";
import Login                                                                from "./components/login";
import Main                                                                 from "./components/main";
import CharacterBio                                                         from "./components/characterBio";
import ComicBio                                                             from "./components/comicBio";
import ComicsMain                                                           from "./components/comicsMain";
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect}  from "react-router";

let router;

const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
  	    </Route>
    </Router>
);

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="characterBio" component={CharacterBio} />

        <Route path="comicBio" component={ComicBio} />
        <Route path="comics" component={ComicsMain} />
            <IndexRoute component={Main} />
            <Redirect from = "*" to = "/" />
        </Route>
    </Router>

);

if (location.pathname == "/welcome") {
    router = notLoggedInRouter
} else {
    router = loggedInRouter
}

//Render all our stuff ............................................................................
ReactDOM.render(router, document.querySelector("body"));
