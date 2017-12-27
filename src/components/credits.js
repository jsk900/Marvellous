// Setup
import React from "react";

// Our Marvel link component
export default function Credits({credit}) {
    function createMarkup() { return {__html: credit}; };

    return (
        <div dangerouslySetInnerHTML={createMarkup()} credit={credit} />
    );
};
