// Setup
import React from "react";

// Our Marvel link component
const Credits = ({ credit }) => {
    function createMarkup() {
        return { __html: credit };
    }

    return <div dangerouslySetInnerHTML={createMarkup()} credit={credit} />;
};

export default Credits;
