// Setup
import React, {Component} from "react";
import CharacterList      from "./characterList";

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        if (!this.props.characters) {
            return (
                <p>Loading....</p>
            )
        }
        return (
            <div>
                <div className="characterListContainer"><CharacterList
                    characters={this.props.characters}
                    selectCharacter={this.props.selectCharacter}
                    getComics={this.props.getComics}
                    comics={this.props.comics} />
                </div>
            </div>
        )

    }
}
