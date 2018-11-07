import React, { Component } from 'react'; 
import axios from 'axios'; 
import YouTubeEmbedder from 'youtube-embed-video'; 
import './News.css'; 

import search from './search.png'; 
import space from './space.png'; 
import video from './video.png'; 
import collection from './collection.png'; 

import { connect } from 'react-redux'; 
import { loginUser } from '..//../ducks/reducer'; 
import { logoutUser } from '..//../ducks/reducer'; 

import NewsItem from './NewsItem'; 

class News extends Component {
    constructor() {
        super()
        this.state = {
            mainNewsFeed: [], 
            mainVideoFeed: [],
            searchString: '', 
            videoMode: false, 
            archives: [], 
            user: null
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

    archive = (index) => {
        if (this.props.user.user.user_id === null) {
            alert('Please create an account or log in')
            return
        }
        const array = this.state.videoMode ? this.state.mainVideoFeed : this.state.mainNewsFeed; 
        const archive = array[index]; 

        //TODO this will only be for news, not YouTube 
        const newNewsArchive = {
            userId: this.props.user.user.user_id, 
            mediaUrl: archive.urlToImage,
            description: archive.title, 
            mainURL: archive.url
        } 
        axios.post('/api/archives', newNewsArchive).then(response => {
            // console.log('response data after post archive', response.data)
            // this.setState({ archives: response.data })
            this.fetchArchives(); 
        }).catch(error => {
            console.log('error', error)
        })
    }

    fetchArchives = () => {
        if (this.props.user === undefined || this.props.user === null) { return }
        if (this.props.user.user === undefined || null) { return }
        if (this.props.user.user.user_id === undefined || null) { return }
        const request = { userId: this.props.user.user.user_id }
        axios.post('/api/archives/all', request).then(response => {
            console.log('arch', response.data)
            this.setState({ archives: response.data })
        }).catch(error => {
            console.log('error fetching archives', error)
        })
    }

    deleteArchive = (id) => {
        if (this.props.user.user.user_id === null || this.props.user.user.user_id === undefined) { return }
        const { author_id } = this.props.user.user.user_id; 
        axios.delete(`/api/archived/${author_id}/${id}`).then(response => {
            this.setState({ archives: response.data })
        })
    }

    share = (val) => {

    }

    searchTapped = () => {

    }

    //Returns a lot (slow), maybe return 10 - 20 or load/render in pieces
    //TODO add search param to string via ${}
    fetchYoutubeVideos() {
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=outerspacenasa&chart=mostPopular&maxResults=10&type=video&videoCategoryId=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
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
        this.fetchArchives(); 
    }

    render() {
        console.log('props', this.props)
        const mainFeedMapped = this.state.mainNewsFeed.map((newsItem, index) => {
            return <NewsItem createFn={this.archive} 
            title={newsItem.title}
            image={newsItem.urlToImage}
            id={newsItem.publishedAt}
            index={index}/> 
        })

        const mappedYoutubeVideos = this.state.mainVideoFeed.map(video => {
            return <div className="feed_cell">
                 <YouTubeEmbedder className="video_display" videoId={video["id"]["videoId"]}/> 
                 <button>Archive</button>
                 <button>Share</button>
            </div>
        })

        //TODO add ref to main URL 

        //TODO still crashes on add 

        const archives = this.state.archives.map(archive => {
            return <div className="archive_container">
                <img src={archive.post_media} alt=""/>
                <p>{archive.title}</p>
                <button onClick={this.deleteArchive(archive.id)}>Delete</button>
            </div>
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(News); 