import React, { Component, PropTypes } from 'react'

class Posts extends Component {
  render(){
  if(this.props.loading) {
    return <h2>Loading...</h2>
  }

  return <ul className="list-group mb-4">
    {this.props.items.map(item=>(
      <li key={item.id} className="list-group-item">
        {item.name}
      </li>
    ))}
  </ul>
}
}

export default Posts

