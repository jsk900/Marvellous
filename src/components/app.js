//Setups
import React, { Component} from "react";
import MainHeader         from "./mainHeader";
import Main               from "./main";
import Footer             from "./footer";
import { Link }           from "react-router";
import CharacterBio       from "./characterBio";
import axios              from "../axios";
import CharacterList      from "./characterList";

const noImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            comics: [],
            videos: [],
            credit: null,
            selectedCharacter: null,
            selectedComic: null,
            selectedVideo: null,
            characterCount:  0,
            charSearch: "A",
            name: null,
            disableSearch: false
        };

        this.getName                    = this.getName.bind(this)
        this.characterList              = this.characterList.bind(this)
        this.removeNoImage              = this.removeNoImage.bind(this)
        this.handleSubmit               = this.handleSubmit.bind(this)
        this.selectCharacter            = this.selectCharacter.bind(this)
        this.selectComic                = this.selectComic.bind(this)
        this.getComics                  = this.getComics.bind(this)
        this.changeSearchState          = this.changeSearchState.bind(this)
    }

    componentDidMount() {
        this.characterList()
        .then(() => {this.removeNoImage()})
        .then(() => {this.getName()})
    }

    changeSearchState() {
        this.setState({disableSearch: false})
    }

    getName() {
        axios.post("/getName", {
            name
            }).then((resp) => {

            if(resp.data.success) {
                this.setState({name: resp.data.name})
            }
        });
    }

    characterList() {
        var charSearch = this.state.charSearch;
        var url       = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${charSearch}&limit=50&ts=1&apikey=24b734a9df515f87bbe1bac66f8dbd5c&hash=a4374486b969b3e7b91f44c63fe5a64d`
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

    removeNoImage() {
        var newcharacters = this.state.characters.filter(function (character) {
            return character.thumbnail.path !== noImage;
        });
        this.setState({characters: newcharacters, characterCount: newcharacters.length})
    }

    handleSubmit(value) {
        this.setState({charSearch: value},() => {
            this.characterList()
            .then(() => {this.removeNoImage()})
        })
    };

    selectCharacter(value) {
        this.setState({selectedCharacter: value, disableSearch: true});
    };

    selectComic(value) {
        this.setState({selectedComic: value})
    };

    getComics(value) {
        var characterId = value.id;
        var url         = `http://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=24b734a9df515f87bbe1bac66f8dbd5c&hash=a4374486b969b3e7b91f44c63fe5a64d`
        return $.ajax({
            url: url,
            method: 'GET',
            success: (data) => {
                this.setState({
                    comics: data.data.results
                });
            }
        });
    }

    render() {
        const children = React.cloneElement(this.props.children,
        { characters:this.state.characters,
          selectedCharacter:this.state.selectedCharacter,
          selectCharacter:this.selectCharacter,
          selectedComic:this.state.selectedComic,
          selectComic:this.selectComic,
          getComics:this.getComics,
          comics:this.state.comics,
          disableSearch: this.state.disableSearch,
          changeSearchState: this.changeSearchState
      })

        return(
            <div className="mainContainer">
            <div><MainHeader
                name={this.state.name}
                credit={this.state.credit}
                comics={this.state.comics}

                characterCount={this.state.characterCount}
                handleSubmit={this.handleSubmit}
                disableSearch={this.state.disableSearch}
                changeSearchState={this.changeSearchState}
                /></div>
                {children}
                <div className="footer"><Footer /></div>
            </div>
        )
    }
}
// videos={this.state.videos}
