import React from "react";
import { Link } from "react-router";

const ComicsListItem = ({ comic, selectComic }) => {
    let image = comic.thumbnail.path;
    let extension = comic.thumbnail.extension;
    let comicPic = image + "/standard_medium" + "." + extension;
    let comicName = comic.title;

    return (
        <Link to="/comicBio">
            <li
                className="characterContainer"
                onClick={() => selectComic(comic)}
            >
                <p id="characterName">{comicName}</p>
                <img id="characterImage" src={comicPic} />
            </li>
        </Link>
    );
};

export default ComicsListItem;
