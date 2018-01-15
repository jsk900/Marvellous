import React              from "react";
import FavouritesListItem from "./favouritesListItem";

const FavouritesList = (props) => {
    const FavouriteItems = props.favourites.results.map(favourite => {
        return (
            <FavouritesListItem
                selectCharacter = {props.selectCharacter}
                getComics = {props.getComics}
                favourites= {props.favourites}
                heartChange= {props.heartChange}
                key={favourite.id}
                favourite={favourite} />
        )
    });
    return (
        <ul>{FavouriteItems}</ul>
    );
};

export default FavouritesList;
