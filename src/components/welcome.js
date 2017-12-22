//Setups
import React, { Component} from "react";
import WelcomeHeader       from "./welcomeHeader";
import Footer              from "./footer";

// Our Welcome page which is one of our master components
// Straightforward class constrcuter and rendering. This is used in start.js
export default class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="welcomeContainer">
                <div className="welcomeHeader"><WelcomeHeader /></div>
                <div className="main">{this.props.children}</div>
                <div className="footer"><Footer /></div>
            </div>
        )
    }
}
