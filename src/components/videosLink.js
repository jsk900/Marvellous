// Setup
import React    from "react";
import { Link } from "react-router";

export default function VideosLink(props) {
    return (
        <Link  videos={props.videos} className="mainLink" to="/videos">Videos</Link>
    )
}
