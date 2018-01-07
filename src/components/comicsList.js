import React             from "react";
import ComicsListItem from "./comicsListItem";

const ComicsList = ({comics, selectComic, characterName}) => {
    console.log("list", characterName);
    const ComicItems = comics.map(comic => {
        return (
            <ComicsListItem
            selectComic = {selectComic}
                key={comic.id}
                comic={comic}
                characterName={characterName}/>
        )
    });
    return (
        <div>
            <p id="comicsCharacterTitle">Comics for {'\u00A0'}<span>{characterName}</span></p>
            <ul>

                {ComicItems}
            </ul>
        </div>
    );
};

export default ComicsList;
