// Setup
import React, { Component } from "react";

export default class CharacterSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
        this.activateButton = this.activateButton.bind(this);
    }

    componentDidMount(){
        this.firstInput.focus()
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    activateButton(event) {
       if(event.which == 13) {
           this.button.click();
       }
    }

    render() {
        return (
            <div className="mainSearch">
                <input id="searchInput" ref={(input) => {this.firstInput = input; }} type="text" name="search" placeholder="Enter search" onChange={this.handleChange} onKeyPress={this.activateButton}/>
                <button id="searchButton" ref={(button) => {this.button = button; }} onClick={() => this.props.handleSubmit(this.state.search)}>Search</button>

            </div>
        )
    }
}
// <button id="searchButton" onKeyPress={() => this.props.handleEnter(this.state.search)}>Search</button>
