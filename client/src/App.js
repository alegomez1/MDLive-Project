import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Posts from './Posts'
import Pagination from './Pagination'

// let url = 'http://localhost:5000'
let url = 'https://mdlive-project.herokuapp.com'
/**
 * This is the basic App class component
 * It's where all the state values are declared and the handleInputChange function is binded
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: '',
      end: '',
      startName: '',
      maxName: '',
      currentPage: 1,
      postsPerPage: 5, //Change this value to see more posts per page. 5 is a good choice because it doesn't require scrolling down to see everything
      items: [],
      warningBanner: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  /**
   * Search By ID Function
   * This function runs whenever the search button next to the ID input boxes is clicked
   * It makes an axios call to the server using the params: {rangeby: id, start: this.state.start, end: this.state.end}
   * The state values for start and end are written by the user
   */
  searchByID = () => {
    // if (this.state.start >= 1 && this.state.start <= this.state.end) {
    //   this.setState({
    //     warningBanner: '',
    //   })
      axios
        .get(
          `${url}/apps?rangeBy=id&start=${this.state.start}&end=${this.state.end}`
        )
        .then(response => {
          console.log('axios response---', response)
          this.setState({
            items: response.data,
          })
          console.log('new state---', this.state)
        })
    // } 
    // else {
      // this.setState({
      //   warningBanner:
      //     'ID numbers are not valid. Please enter values between 1-50',
      // })
    // }
  }
 /**
  * Search By Name Function
   * This function runs whenever the search button next to the name input boxes is clicked
   * It makes an axios call to the server using the params: {rangeby: name, startName: this.state.startName, maxName: this.state.maxName}
   * The state values for startName and maxName are written by the user
  */
  searchByName = () => {
    axios
      .get(
        `${url}/apps?rangeBy=name&start=${this.state.startName}&end=${this.state.maxName}`
      )
      .then(response => {
        console.log('axios response---', response)
        this.setState({
          items: response.data,
        })
        console.log('new state---', this.state)
      })
  }
/**
 * handleInputChange(event) function
 * This function runs whenever the user types into the input boxes
 * It then sets the state for those values according to what the user typed in
 */
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

/**
 * Paginate function
 * This function is passed as a prop to the Paginate component
 * It's purpose is to change the current page number according what number is clicked when all the pages are generated
 */
  paginate = pageNumber => {
    this.setState({
      currentPage: pageNumber,
    })
  }

  render() {
    /**
     * This logic is used to get what the current items are
     * It's then passed into the Posts component as a prop
     */
    const indexOfLastItem = this.state.currentPage * this.state.postsPerPage
    const indexOfFirstItem = indexOfLastItem - this.state.postsPerPage
    const currentItems = this.state.items.slice(
      indexOfFirstItem,
      indexOfLastItem
    )

    return (
      <div>
      <div className="main-container">
        <h1 className="col-lg-12 align-center">MDLive Project</h1>
        <h3>{this.state.warningBanner}</h3>
        <h3 className="align-center section-header">Search by ID</h3>
        <input className="align-center" id="input-box"
          type="text"
          value={this.state.start}
          name="start"
          placeholder="1-50"
          onChange={this.handleInputChange}
        />
        <input className="align-center"
          type="text"
          value={this.state.end}
          name="end"
          placeholder="1-50"
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchByID}>Search IDs</button>
        <a href={`${url}/apps?rangeBy=id&start=${this.state.start}&end=${this.state.end}`}>
          <button>View JSON</button>
        </a>

        <h3 className="align-center section-header">Search by name</h3>

        <input className="align-center"
          type="text"
          value={this.state.startName}
          name="startName"
          placeholder="my-app-001"
          onChange={this.handleInputChange}
        />
        <input className="align-center"
          type="text"
          value={this.state.maxName}
          name="maxName"
          placeholder="my-app-050"
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchByName}>Search Names</button>
        <a href={`${url}/apps?rangeBy=name&start=${this.state.startName}&end=${this.state.maxName}`}>
          <button>View JSON</button>
        </a>

      </div>
      <Posts
          items={currentItems}
          loading={this.state.loading}
        />
        <Pagination
          totalItems={this.state.items.length}
          itemsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
        />
        </div>
    )
  }
}

export default App
