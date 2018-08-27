// Setup
import React, { PureComponent } from "react";
import FavouritesList from "./favouritesList";

class FavouritesMain extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Main Component to show characters list
    render() {
        if (!this.props.favourites) {
            return <p>Loading....</p>;
        }
        return (
            <div>
                {!this.props.favourites.results.length && (
                    <p id="noCharsMsg">Sorry, No favourites found!!</p>
                )}
                <div className="characterListContainer">
                    <FavouritesList
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

export default FavouritesMain;
