// Setup
import React    from "react";
import { Link } from "react-router";

export default function CharactersLink(props) {
    return (
        <Link  onClick={props.changeSearchState} className="mainLink" to="/">Characters</Link>
    )
}
