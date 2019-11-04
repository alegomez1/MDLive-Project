import React, { Component } from 'react'
/**
 * The Pagination component is used to return a nav full of <a> tags
 * These tags have a number inside them and when clicked will navigate to that page, showing a different list of items
 */
class Pagination  extends Component {
  render () {

    const pageNumbers = []

    for(let i=1; i<= Math.ceil(this.props.totalItems/this.props.itemsPerPage); i++){
      pageNumbers.push(i)
    }
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number=>(
            <li key={number} className="page-item">
              <a onClick={()=> this.props.paginate(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

export default Pagination 