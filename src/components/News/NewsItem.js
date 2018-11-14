import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import './News.css'; 

export default class NewsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
      const { createFn, title, image, index, url } = this.props; 
      return (
        <div className="feed_cell">
             <p>{title}</p>
               {/* <img onClick={window.open(url)} src={image} alt=""/> */}
               <a href={url} target={"_Blank"}><img src={image}/></a>
               <div className="button_container_news">
               <button onClick={() => createFn(index)}>Archive</button>
               <button>Share</button>
             </div>
        </div>
      )
    }
}