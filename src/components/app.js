// Setup
import React, { Component} from "react";
import MainHeader         from "./mainHeader";
import Main               from "./main";
import Footer             from "./footer";
import { Link }           from "react-router";
import CharacterBio       from "./characterBio";
import axios              from "../axios";
import CharacterList      from "./characterList";

// url for Marvel no image on character
const noImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"



// Setup our Master App component. Set all our state data and declare all our functions
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            favourites: [],
            comics: [],
            credit: null,
            selectedCharacter: null,
            selectedComic: null,
            selectedVideo: null,
            characterCount:  0,
            memberCount: 0,
            comicCount: 0,
            charSearch: "A",
            name: null,
            disableSearch: false,
            success: false
        };

        this.getName                    = this.getName.bind(this)
        this.getMemberCount             = this.getMemberCount.bind(this)
        this.characterList              = this.characterList.bind(this)
        this.getFavourites              = this.getFavourites.bind(this)
        this.heartChange                = this.heartChange.bind(this)
        this.removeNoImage              = this.removeNoImage.bind(this)
        this.removeNoImage2             = this.removeNoImage2.bind(this)
        this.handleSubmit               = this.handleSubmit.bind(this)
        this.selectCharacter            = this.selectCharacter.bind(this)
        this.selectComic                = this.selectComic.bind(this)
        this.getComics                  = this.getComics.bind(this)
        this.changeSearchState          = this.changeSearchState.bind(this)
    }

    // Here we fire off all the stuff we want rendered to the App before we see it
    // In this case we need to get all the characters from Marvel and remove all no images
    // Plus we need to get the name from the server and database to pass into our browser
    componentDidMount() {
        this.characterList()
        .then(() => {this.removeNoImage()})
        .then(() => {this.getName()})
        .then(() => {this.getMemberCount()})
        .then(() => {this.getFavourites()})
    }

    // As the searchBar is part of the header we need to hide it unless it's on the main
    // character list page
    changeSearchState() {
        this.setState({disableSearch: false})
    }

    // Get the users name from the server/database
    getName() {
        return axios.post("/getName", {
            name
        }).then((resp) => {
            if(resp.data.success) {
                this.setState({name: resp.data.name})
            }
        })
    }

    // Get the users count from the server/database
    getMemberCount() {
        return axios.post("/getMemberCount", {
            name
        }).then((resp) => {
            if(resp.data.success) {
                this.setState({memberCount: resp.data.memberCount})
            }
        })
    }

    // Api call to marvel to get the initial list of character. Subsequent calls will use whatever the
    // entered into the searchBar.
    characterList() {
        var charSearch = this.state.charSearch;
        var url       = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${charSearch}&limit=50&ts=1&apikey=24b734a9df515f87bbe1bac66f8dbd5c&hash=a4374486b969b3e7b91f44c63fe5a64d`
        return $.ajax({
            url: url,
            method: 'GET',
            success: (data) => {
                this.setState({
                    characters: data.data.results,
                    credit: data.attributionHTML
                });
            }
        });
    }

    // remove all the no image characters from data retrieved from the Marvel Api (characters)
    removeNoImage() {
        var newcharacters = this.state.characters.filter(function (character) {
            return character.thumbnail.path !== noImage;
        });
        this.setState({characters: newcharacters, characterCount: newcharacters.length})
    }

    // remove all the no image characters from data retrieved from the Marvel Api (comics)
    removeNoImage2() {
        var newcomics = this.state.comics.filter(function (comic) {
            return comic.thumbnail.path !== noImage;
        });
        this.setState({comics: newcomics, comicCount: newcomics.length})
    }

    // Get favourites for the logged in user
    getFavourites() {
        return axios.post("/getFavourites", {
            }).then((resp) => {
                if(resp.data.success) {
                    this.setState({favourites: resp.data})
                }
            })
    }

    heartChange() {
        location.reload();
    }

    // Submit handler for the searchBar.
    handleSubmit(value) {
        this.setState({charSearch: value},() => {
            this.characterList()
            .then(() => {this.removeNoImage()})
        })
    };

    // User has selected a character. Set state to selected character.
    selectCharacter(value) {
        this.setState({selectedCharacter: value, disableSearch: true});
    };

    // User has selected a comic. Set state to selected comic.
    selectComic(value) {
        this.setState({selectedComic: value})
    };

    // User has selected a character to view more info. Get comic info for selected character
    getComics(value) {
        var characterId = value.id;
        var url         = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=24b734a9df515f87bbe1bac66f8dbd5c&hash=a4374486b969b3e7b91f44c63fe5a64d`
        return $.ajax({
            url: url,
            method: 'GET',
            success: (data) => {
                this.setState({
                    comics: data.data.results
                }, () => { this.removeNoImage2()}
                )
            }
        });
    }

    // Here we render all the children and send all the functions and data to them
    render() {
        const children = React.cloneElement(this.props.children,
        { characters: this.state.characters,
          favourites: this.state.favourites,
          selectedCharacter: this.state.selectedCharacter,
          selectCharacter: this.selectCharacter,
          selectedComic: this.state.selectedComic,
          selectComic: this.selectComic,
          getComics: this.getComics,
          comics: this.state.comics,
          comicCount: this.state.comicCount,
          disableSearch: this.state.disableSearch,
          changeSearchState: this.changeSearchState,
          heartChange: this.heartChange
      })

        // Here we actually display what we want on this main App.
        // In this case it will be the header and all associated data.
        // Plus all the children and the footer.
        return(
            <div className="mainContainer">
            <div><MainHeader
                name={this.state.name}
                credit={this.state.credit}
                comics={this.state.comics}
                characterCount={this.state.characterCount}
                memberCount={this.state.memberCount}
                handleSubmit={this.handleSubmit}
                disableSearch={this.state.disableSearch}
                changeSearchState={this.changeSearchState}
                heartChange={this.heartChange}
                /></div>
                {children}
                <div className="footer"><Footer /></div>
            </div>
        )
    }
}
