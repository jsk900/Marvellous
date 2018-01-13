import React    from "react";
import { Link } from "react-router";
import Heart    from "./heart";

const CharacterListItem = ({character, selectCharacter, getComics, favourites, heartChange}) => {
    let image           = character.thumbnail.path;
    let extension       = character.thumbnail.extension;
    let characterPic    = image + "/landscape_small" + "." + extension;
    let characterId     = character.id;
    let favouritesArray = favourites.results;
    let favouritesHeart = false;

    if (favouritesArray) {
        for (var i = 0; i < favouritesArray.length; i++) {
            if (favouritesArray[i].characterid == characterId) {
                favouritesHeart = true;
                break;
            }
        }
    }


    return (
            <li className="characterContainer">
                <Link to = "/characterBio">
                    <p id="characterName">{character.name}</p>
                    <img id="characterImage" src={characterPic} onClick={(event) => { selectCharacter(character); getComics(character);}}/>
                </Link>
                <Heart
                  favouritesHeart={favouritesHeart}
                  characterId={characterId}
                  characterPic={characterPic}
                  characterName={character.name}
                  heartChange={heartChange}
                />
            </li>
    )
};

export default CharacterListItem;
