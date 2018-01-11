import React, { Component } from "react";
import axios                from "../axios";

export default class Heart extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const {characterId, characterPic, characterName} = this.props;
        axios.post("/favourites", {
            characterId,
            characterPic,
            characterName
        }).then((resp) => {
                if(resp.data.success) {
                    this.setState({success: true})
                }
            });
    }

    render() {
        const favouritesHeart = this.props.favouritesHeart;
        return (
            <div className="heartContainer">
                {favouritesHeart && <input id="heart" type="image" src="./public/heart.png" name="unfav"  onClick={this.handleSubmit}/>}
                {!favouritesHeart && <input id="heart" type="image" src="./public/heart2.png" name="unfav" onClick={this.handleSubmit} />}
                {!favouritesHeart && <p id="heartParagraph">Add to Favourites</p>}
                {favouritesHeart && <p id="heartParagraph">Remove from Favourites</p>}
           </div>

        )
    }
}
