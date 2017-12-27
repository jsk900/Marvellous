// Setup
import React                from "react";
import Counts               from "./counts";
import CharactersLink       from "./charactersLink";
import Logout               from "./logout";
import Credits              from "./credits";

// This our title component used on our Main app header.
export default function Title(props) {
    // This part of the header displays title, user name, character count,
    // our links and the Marvel link.
    return (
        <div className="mainHeader">
            <h3>Marvel Characters</h3>
            <Counts name={props.name} characterCount={props.characterCount} />
            <ul>
                <li><CharactersLink changeSearchState={props.changeSearchState}/></li>
                <li><Logout /></li>
                <li className="mainLink"><Credits  credit={props.credit} /></li>
            </ul>
        </div>
    );
};
