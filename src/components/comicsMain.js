// Setup
import React, {Component} from "react";
import ComicsList         from "./comicsList";

export default class ComicsMain extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        if (!this.props.comics) {
            return (
                <p>Loading....</p>
            )
        }
        return (
            <div>
                <div className="characterListContainer"><ComicsList
                    characters={this.props.characters}
                    selectComic={this.props.selectComic}
                    getComics={this.props.getComics}
                    comics={this.props.comics} />
                </div>
            </div>
        )

    }
}
