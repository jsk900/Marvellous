import React, { PureComponent } from "react";

class Heart extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { characterId, characterPic, characterName } = this.props;
        this.props.heartChange(characterId, characterPic, characterName);
    }

    render() {
        const { favouritesHeart } = this.props;
        return (
            <div className="heartContainer">
                {favouritesHeart && (
                    <input
                        id="heart"
                        type="image"
                        src="./public/heart.png"
                        name="unfav"
                        onClick={this.handleSubmit}
                    />
                )}
                {!favouritesHeart && (
                    <input
                        id="heart"
                        type="image"
                        src="./public/heart2.png"
                        name="unfav"
                        onClick={this.handleSubmit}
                    />
                )}
                {!favouritesHeart && (
                    <p id="heartParagraph">Add to Favourites</p>
                )}
                {favouritesHeart && (
                    <p id="heartParagraph">Remove from Favourites</p>
                )}
            </div>
        );
    }
}

export default Heart;
