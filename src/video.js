import React, { Component } from "react";
import ReactDOM             from "react-dom";
import YTSearch             from "youtube-api-search";
import VideoList            from "./components/video_list";
import VideoDetail          from "./components/video_detail";

const API_KEY = "AIzaSyC6pDeyhtwuXNI22UtpwoIR0nqZuup2KyI";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        YTSearch({key: API_KEY, term: "ironman trailers"}, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        })
    }

    render() {
        return (
            <div>
                <VideoDetail  video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));
