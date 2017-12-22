import React    from "react";
import { Link } from "react-router";

const CharacterListItem = ({character, selectCharacter, getComics}) => {
    let image           = character.thumbnail.path;
    let extension       = character.thumbnail.extension;
    let characterPic    = image + "/landscape_small" + "." + extension;
    let characterId     = character.id;
    //
    return (
        <Link to = "/characterBio">

        <li className="characterContainer" onClick={(event) => { selectCharacter(character); getComics(character); }}>
            <p id="characterName">{character.name}</p>
            <img id="characterImage" src={characterPic} />
        </li>
        </Link>

    )
};

export default CharacterListItem;
