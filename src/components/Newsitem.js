import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title,description,imgUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:"90%", zIndex:"1"}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
  <img src={imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toUTCString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
