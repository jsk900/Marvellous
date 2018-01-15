import React    from "react";
import { Link } from "react-router";
import Heart    from "./heart";

const FavouriteListItem = ({favourite, selectCharacter, getComics, heartChange}) => {
    let characterPic    = favourite.characterpic;
    let characterId     = favourite.characterid;
    let characterName   = favourite.charactername;
    let favouritesHeart = true;

    return (
            <li className="characterContainer">
                <p id="characterName">{characterName}</p>
                <img id="favouriteImage" src={characterPic} />

                <Heart
                  favouritesHeart={favouritesHeart}
                  characterId={characterId}
                  characterPic={characterPic}
                  characterName={characterName}
                  heartChange={heartChange}
                />
            </li>
    )
};

export default FavouriteListItem;
