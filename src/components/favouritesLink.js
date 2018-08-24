// Setup
import React from "react";
import { Link } from "react-router";

const FavouritesLink = props => {
    return (
        <Link
            onClick={props.changeSearchState}
            favourites={props.favourites}
            className="mainLink"
            to="/favourites"
        >
            Favourites
        </Link>
    );
};

export default FavouritesLink;
