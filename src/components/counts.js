import React, { Component } from "react";

export default class Counts extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // {'\u00A0'} means &nbsp
    render() {
        return (
            <div id="counts">
                <p id="name">Hi....<span>({'\u00A0'}{this.props.name}{'\u00A0'})</span></p>
                <p>Characters total....<span>({'\u00A0'}{this.props.characterCount}{'\u00A0'})</span></p>
            </div>
        )
    }
}
