// Setup
import React    from "react";
import { Link } from "react-router";

// Our logo component
export default function FavouritesLink() {
    return (
        <Link className="mainLink" to="/favourites">Favourites</Link>
    );
}
