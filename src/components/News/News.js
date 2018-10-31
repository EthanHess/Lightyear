import React, { Component } from 'react'; 
import axios from 'axios'; 
import './News.css'; 

export default class News extends Component {
    constructor() {
        super()
        this.state = {
            mainNewsFeed: [], 
            searchString: '', 
            videoMode: false
        }
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
            </div>
        })

        return (
            <div className="news_container">
                <div className="top_bar">
                
                </div>
                <div className="news_table">
                    { mainFeedMapped }
                </div>
            </div>
        )
    }
}