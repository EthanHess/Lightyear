import React, { Component } from 'react'; 
import axios from 'axios'; 
import './News.css'; 

import search from './search.png'; 
import space from './space.png'; 
import video from './video.png'; 

export default class News extends Component {
    constructor() {
        super()
        this.state = {
            mainNewsFeed: [], 
            searchString: '', 
            videoMode: false
        }
    }

    handleInput = (val) => {
        this.setState({ searchString: val})
    }

    //TODO: have only one button? 
    switchMode = () => {
        this.setState({ videoMode: !this.state.videoMode})
    }

    archive = (val) => {

    }

    share = (val) => {

    }

    searchTapped = () => {

    }

    //Can maybe DRY and fetch both in same function? 
    fetchYoutubeVideos() {
        var url = ''
        axios.get(url).then(response => {

        }).catch(error => {
            
        })
    }

    componentDidMount() {
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

    render() {
        console.log('this.state.mainNF', this.state.mainNewsFeed)
        const mainFeedMapped = this.state.mainNewsFeed.map(newsItem => {
            return <div className="feed_cell">
                <p>{newsItem.title}</p>
                <img src={newsItem.urlToImage} alt=""/>
                <div>
                    <button>Archive</button>
                    <button>Share</button>
                </div>
            </div>
        })

        return (
            <div className="news_container">
                <div className="top_bar">
                    <div className="search_div">
                        <img src={search} alt=""/>
                        <input placeholder=" Search" onChange={(e) => this.handleInput(e.target.value)}></input>
                        <button>Search</button>
                    </div>
                    <div className="type_div">
                        <img src={space} alt=""/>
                        <button>News</button>
                        <img src={video} alt=""/>
                        <button>Videos</button>
                    </div>
                </div>
                <div className="news_table">
                    { mainFeedMapped }
                </div>
            </div>
        )
    }
}