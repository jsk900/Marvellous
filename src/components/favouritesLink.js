// Setup
import React    from "react";
import { Link } from "react-router";

export default function FavouritesLink(props) {
    return (
        <Link onClick={props.changeSearchState} favourites={props.favourites} className="mainLink" to="/favourites">Favourites</Link>
    )
}
