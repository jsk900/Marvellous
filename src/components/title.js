// Setup
import React                from "react";
import Counts               from "./counts";
import CharactersLink       from "./charactersLink";
import Logout               from "./logout";
import Credits              from "./credits";

// Our welcome header component
export default function Title(props) {
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
