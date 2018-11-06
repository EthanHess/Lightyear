import React, { Component } from 'react'; 
import './News.css'; 

export default class NewsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
      const { createFn, title, image, index } = this.props; 
      return (
        <div className="feed_cell">
             <p>{title}</p>
             <img src={image} alt=""/>
                 <div className="button_container_news">
               <button onClick={() => createFn(index)}>Archive</button>
               <button>Share</button>
             </div>
        </div>
      )
    }
}