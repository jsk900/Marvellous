import React from "react";

const ComicBio = ({selectedComic}) => {
    console.log("bio", selectedComic);
    if (!selectedComic) {
        return <div>Loading...</div>
    }

    let image         = selectedComic.thumbnail.path;
    let extension     = selectedComic.thumbnail.extension;
    let comicPic      = image + "/portrait_uncanny" + "." + extension;
    let comicId       = selectedComic.id;
    let comicName     = selectedComic.title;
    let comicDesc     = selectedComic.description;

    return (
        <div className="characterListContainer">
            <div className="bioContainer">
                <div className="bioContainer1">
                    <p>{comicName}</p>
                    <img id="bioImage" src={comicPic} />
                </div>

                <div className="bioContainer2">
                    {comicDesc && <p>{comicDesc}</p>}
                    {!comicDesc && <p>Unfortunately there is no description for this character</p>}
                </div>
            </div>
        </div>
    );
};

export default ComicBio;
