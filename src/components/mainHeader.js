// Setup
import React, { Component } from "react";
import Title                from "./title";
import CharacterSearch      from "./characterSearch";

export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // Header for our App master Component. Pass the data onto our Title Component.
    // Here we also only show the searchBar if we need to
    render() {
        return (
            <div>
                <Title
                name={this.props.name}
                disableSearch={this.props.disableSearch}
                changeSearchState={this.props.changeSearchState}
                credit={this.props.credit}
                characterCount={this.props.characterCount}
                memberCount={this.props.memberCount}
                favourites={this.props.favourites}/>
                {!this.props.disableSearch && <CharacterSearch id="search" handleSubmit={this.props.handleSubmit} />}
                {this.props.disableSearch && <div />}
            </div>
        );
    }
}
