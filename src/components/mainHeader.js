import React, { Component } from "react";
import Title                from "./title";
import CharacterSearch      from "./characterSearch";

export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Title
                name={this.props.name}
                changeSearchState={this.props.changeSearchState}
                credit={this.props.credit}

                characterCount={this.props.characterCount} />
                {!this.props.disableSearch && <CharacterSearch id="search" handleSubmit={this.props.handleSubmit} />}
                {this.props.disableSearch && <div />}
            </div>
        );
    }
}
