// Setup
import React from "react";
import Counts from "./counts";
import CharactersLink from "./charactersLink";
import FavouritesLink from "./favouritesLink";
import Logout from "./logout";
import Credits from "./credits";

// This our title component used on our Main app header.
const Title = props => {
    return (
        <div className="mainHeader">
            <h3>Marvel Characters</h3>
            <Counts
                name={props.name}
                characterCount={props.characterCount}
                memberCount={props.memberCount}
            />
            <ul>
                <li>
                    <CharactersLink
                        changeSearchState={props.changeSearchState}
                    />
                </li>
                <li>
                    <FavouritesLink
                        changeSearchState={props.changeSearchState}
                        disableSearch={props.disableSearch}
                        favourites={props.favourites}
                    />
                </li>
                <li>
                    <Logout />
                </li>
                <li className="mainLink">
                    <Credits credit={props.credit} />
                </li>
            </ul>
        </div>
    );
};

export default Title;
