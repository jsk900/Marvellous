import React             from "react";
import CharacterListItem from "./characterListItem";

const CharacterList = (props) => {
    const CharacterItems = props.characters.map(character => {
        return (
            <CharacterListItem
                selectCharacter = {props.selectCharacter}
                getComics = {props.getComics}
                favourites= {props.favourites}
                heartChange= {props.heartChange}
                key={character.id}
                character={character} />
        )
    });
    return (
        <ul>{CharacterItems}</ul>
    );
};

export default CharacterList;
