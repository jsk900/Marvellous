// Setup
import React, {Component} from "react";
import ComicsList         from "./comicsList";


// This is the comics version of out Main component. All sorted out from
// start.js handling our routes. I guess this is where we would also handle videos
// and favourites
export default class ComicsMain extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        console.log("comicsmain", this.props);
        if (!this.props.comics) {
            return (
                <p>Loading....</p>
            )
        }
        return (
            <div>
                <div className="characterListContainer"><ComicsList
                    characters={this.props.characters}
                    characterName={this.props.selectedCharacter.name}
                    selectComic={this.props.selectComic}
                    getComics={this.props.getComics}
                    comics={this.props.comics} />
                </div>
            </div>
        )

    }
}
