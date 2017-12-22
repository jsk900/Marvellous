// Setup
import React    from "react";
import { Link } from "react-router";

export default function ComicsLink(props) {
    return (
        <Link  comics={props.comics} className="comicsLink" to="/comics">Comics</Link>
    )
}
