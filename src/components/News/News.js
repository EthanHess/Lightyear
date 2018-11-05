import React, { Component } from 'react'; 
import axios from 'axios'; 
import YouTubeEmbedder from 'youtube-embed-video'; 
import './News.css'; 

import search from './search.png'; 
import space from './space.png'; 
import video from './video.png'; 
import collection from './collection.png'; 

export default class News extends Component {
    constructor() {
        super()
        this.state = {
            mainNewsFeed: [], 
            mainVideoFeed: [],
            searchString: '', 
            videoMode: false, 
            archives: []
        }
        this.fetchNews = this.fetchNews.bind(this); 
        this.fetchYoutubeVideos = this.fetchYoutubeVideos.bind(this); 
    }

    handleInput = (val) => {
        this.setState({ searchString: val})
    }

    //TODO: have only one button? 
    switchMode = () => {
        this.setState({ videoMode: !this.state.videoMode})
        const vMode = this.state.videoMode; 
        if (vMode === true) {
            this.fetchYoutubeVideos()
        } else {
            this.fetchNews()
        }
    }

    archive = (val) => {

    }

    share = (val) => {

    }

    searchTapped = () => {

    }

    //Returns a lot (slow), maybe return 10 - 20 or load/render in pieces
    //TODO add search param to string via ${}
    fetchYoutubeVideos() {
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=outerspacenasa&chart=mostPopular&maxResults=50&type=video&videoCategoryId=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
        axios.get(url).then(response => {
            console.log('V RESPONSE', response.data["items"])
            this.setState({ mainVideoFeed: response.data["items"] })
        }).catch(error => {
            console.log('error fetching video data', error); 
        })
    }

    fetchNews() {
        // --- TODO credit Google for their API! ---
        var url = 'https://newsapi.org/v2/everything?' +
        'q=Nasa&' +
        'from=2018-10-29&' +
        'sortBy=popularity&' +
        `apiKey=${process.env.REACT_APP_GOOGLE_NEWS_API_KEY}`;
        axios.get(url).then(response => {
         this.setState({ mainNewsFeed: response.data["articles"] })
        }).catch(error => {
           console.log('error fetching news data', error); 
        })
    }

    componentDidMount() {
        this.fetchNews();
    }

    render() {
        const mainFeedMapped = this.state.mainNewsFeed.map(newsItem => {
            return <div className="feed_cell">
                <p>{newsItem.title}</p>
                <img src={newsItem.urlToImage} alt=""/>
                <div className="button_container_news">
                    <button>Archive</button>
                    <button>Share</button>
                </div>
            </div>
        })

        const mappedYoutubeVideos = this.state.mainVideoFeed.map(video => {
            return <div className="feed_cell">
                 <YouTubeEmbedder className="video_display" videoId={video["id"]["videoId"]}/> 
                 <button>Archive</button>
                 <button>Share</button>
            </div>
        })

        const archives = this.state.archives.map(archive => {
            return <div></div>
        })

        const vMode = this.state.videoMode; 
        const title = vMode === true ? "Videos" : "News"; 
        const imgSrc = vMode === true ? video : space; 

        return (
            <div className="news_container">
                <div className="top_bar">
                    <div className="search_div">
                        <img src={search} alt=""/>
                        <input placeholder=" Search" onChange={(e) => this.handleInput(e.target.value)}></input>
                        <button>Search</button>
                    </div>
                    <div className="type_div">
                        <img src={imgSrc} alt=""/>
                        <button onClick={ this.switchMode }>{ title }</button>
                    </div>
                </div>
                <div className="body_container">
                <div className="news_table">
                    { vMode === true ? mappedYoutubeVideos : mainFeedMapped }
                </div>
                <div className="collection">
                    <div className="sub_header">
                    <img src={collection} alt=""/>
                    <p>Archives</p>
                    </div>
                    {archives}
                </div>
                </div>
            </div>
        )
    }
}