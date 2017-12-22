// Setup
import React, { Component } from "react";

export default class CharacterSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.firstInput.focus()
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="mainSearch">
                <input id="searchInput" ref={(input) => {this.firstInput = input; }} type="text" name="search" placeholder="Enter search" onChange={this.handleChange}/>
                <button id="searchButton" onClick={() => this.props.handleSubmit(this.state.search)}>Search</button>
            </div>
        )
    }
}
