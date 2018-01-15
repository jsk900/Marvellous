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
import FavouritesMain                                                       from "./components/favouritesMain";
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect}  from "react-router";

let router;

// Not logged in yet. Show welcome page and register component
const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/register" component={Register} />
            <IndexRoute component={Login} />
  	    </Route>
    </Router>
);

// Logged in so show main app and character list page
const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="characterBio" component={CharacterBio} />

        <Route path="comicBio" component={ComicBio} />
        <Route path="comics" component={ComicsMain} />

        <Route path="favourites" component={FavouritesMain} />

            <IndexRoute component={Main} />
            <Redirect from = "*" to = "/" />
        </Route>
    </Router>

);

// The server checks whether there is a session of not. If not it redirects to the welcome path.
// Here we check what path we're on and determines what app and component to show
if (location.pathname == "/welcome") {
    router = notLoggedInRouter
} else {
    router = loggedInRouter
}

//Render all our stuff ............................................................................
ReactDOM.render(router, document.querySelector("body"));
