// Setup
import React from "react";
import { Link } from "react-router";

const ComicsLink = props => {
    return (
        <Link comics={props.comics} className="comicsLink" to="/comics">
            Comics
        </Link>
    );
};

export default ComicsLink;
