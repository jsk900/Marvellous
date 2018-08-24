// Setup
import React from "react";
import { Link } from "react-router";

const CharactersLink = props => {
    return (
        <Link onClick={props.changeSearchState} className="mainLink" to="/">
            Characters
        </Link>
    );
};

export default CharactersLink;
