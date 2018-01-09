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
                    this.setState({name: resp.data.name})
                }
            });
    }

    render() {
        return (
            <div className="heartContainer">
                {this.props.favouritesHeart && <input id="heart" type="image" src="./public/heart.png" name="unfav" onClick={this.handleSubmit} />}
                {!this.props.favouritesHeart && <input id="heart" type="image" src="./public/heart2.png" name="unfav" onClick={this.handleSubmit} />}
                {this.props.favouritesHeart && <p id="heaartParagraph">Remove from Favourites</p>}
                {!this.props.favouritesHeart && <p id="heaartParagraph">Add to Favourites</p>}
           </div>

        )
    }
}
