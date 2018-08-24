// Setup
import React, { PureComponent } from "react";
import CharacterList from "./characterList";

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Main Component to show characters list
    render() {
        if (!this.props.characters) {
            return <p>Loading....</p>;
        }
        return (
            <div>
                {!this.props.characters.length && (
                    <p id="noCharsMsg">Sorry, No characters found!!</p>
                )}
                <div className="characterListContainer">
                    <CharacterList
                        characters={this.props.characters}
                        favourites={this.props.favourites}
                        selectCharacter={this.props.selectCharacter}
                        getComics={this.props.getComics}
                        comics={this.props.comics}
                        heartChange={this.props.heartChange}
                    />
                </div>
            </div>
        );
    }
}

export default Main;
