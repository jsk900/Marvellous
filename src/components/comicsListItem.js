import React    from "react";
import { Link } from "react-router";

const ComicsListItem = ({comic, selectComic}) => {

    let image         = comic.thumbnail.path;
    let extension     = comic.thumbnail.extension;
    let comicPic      = image + "/landscape_small" + "." + extension;
    let comicId       = comic.id;
    let comicName     = comic.name;
console.log(selectComic);
    return (
        <Link to = "/comicBio">
        <li className="characterContainer" onClick={() => selectComic(comic)}>
            <p id="characterName">{comicName}</p>
            <img id="characterImage" src={comicPic} />
        </li>
        </Link>
    )
};

export default ComicsListItem;
