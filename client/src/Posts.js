import React, { Component, PropTypes } from 'react'
/**
 * The Posts component is used to return all of the items that are returned from the axios call
 * These items are returned in a list, and show the name of the app as well as it's id
 */
class Posts extends Component {
  render(){
  //If the component is still loading it returns a loading header
  if(this.props.loading) {
    return <h2>Loading...</h2>
  }
  //Otherwise it returns the list of items
  return <ul className="list-group mb-4">
    {this.props.items.map(item=>(
      <li key={item.id} className="list-group-item">
        {item.name}
        <p>ID: {item.id}</p>
      </li>
    ))}
  </ul>
}
}
export default Posts

