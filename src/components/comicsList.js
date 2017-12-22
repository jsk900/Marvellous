import React             from "react";
import ComicsListItem from "./comicsListItem";

const ComicsList = ({comics, selectComic}) => {
    const ComicItems = comics.map(comic => {
        console.log("list", selectComic);
        return (
            <ComicsListItem
            selectComic = {selectComic}
                key={comic.id}
                comic={comic} />
        )
    });
    return (
        <ul>
            {ComicItems}
        </ul>
    );
};

export default ComicsList;
