import React from "react";
import ComicsLink          from "./comicsLink";

const CharacterBio = ({selectedCharacter, comics, comicCount}) => {

    if (!selectedCharacter) {
        return <div>Loading...</div>
    }

    let image         = selectedCharacter.thumbnail.path;
    let extension     = selectedCharacter.thumbnail.extension;
    let characterPic  = image + "/portrait_uncanny" + "." + extension;
    let characterId   = selectedCharacter.id;
    let characterName = selectedCharacter.name;
    let characterDesc = selectedCharacter.description;
    let noComics      = false;

    if (comicCount === 0) {
        noComics = true;
    } else {
        noComics = false;
    }

    return (
        <div className="characterListContainer">
            <div className="bioContainer">
                <div className="bioContainer1">
                    <p>{characterName}</p>
                    <img id="bioImage" src={characterPic} />
                </div>

                <div className="bioContainer2">
                    {characterDesc && <p>{characterDesc}</p>}
                    {!characterDesc && <p>Unfortunately there is no description for this character</p>}
                    {noComics && <p>Unfortunately there are no comics for this character</p>}
                    {!noComics && <p><ComicsLink comics={comics} characterName={characterName}/>{'\u00A0'}{'\u00A0'}<span>{comicCount}</span></p>}
                </div>
            </div>
        </div>
    );
};

export default CharacterBio;
