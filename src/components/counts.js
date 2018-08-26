import React, { PureComponent } from "react";

// Character counts
class Counts extends PureComponent {
    state = {};

    // {'\u00A0'} means &nbsp
    render() {
        return (
            <div id="counts">
                <p id="name">
                    Hi....
                    <span>
                        ({"\u00A0"}
                        {this.props.name}
                        {"\u00A0"})
                    </span>
                </p>
                <p>
                    Characters total....
                    <span>
                        ({"\u00A0"}
                        {this.props.characterCount}
                        {"\u00A0"})
                    </span>
                </p>
                <p>
                    Members total....
                    <span>
                        ({"\u00A0"}
                        {this.props.memberCount}
                        {"\u00A0"})
                    </span>
                </p>
            </div>
        );
    }
}

export default Counts;
