import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Posts from './Posts'
import Pagination from './Pagination'

let url = 'http://localhost:5000'
// let url = 'https://mdlive-project.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startID: '',
      maxID: '',
      startName: '',
      maxName: '',
      currentPage: 1,
      postsPerPage: 5,
      items: [],
      warningBanner: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  //Search by ID function
  searchByID = () => {
    if (this.state.startID >= 1 && this.state.startID <= this.state.maxID) {
      this.setState({
        warningBanner: '',
      })
      axios
        .get(
          `${url}/apps/range=by=id_start=${this.state.startID}&max=${this.state.maxID}`
        )
        .then(response => {
          console.log('axios response---', response)
          this.setState({
            items: response.data,
          })
          console.log('new state---', this.state)
        })
    } else {
      this.setState({
        warningBanner:
          'ID numbers are not valid. Please enter values between 1-50',
      })
    }
  }
  //Search by name function
  searchByName = () => {
    axios
      .get(
        `${url}/apps/range=by=name_start=${this.state.startName}&max=${this.state.maxName}`
      )
      .then(response => {
        console.log('axios response---', response)
        this.setState({
          items: response.data,
        })
        console.log('new state---', this.state)
      })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log('current state----', this.state)
  }

  //Change page
  paginate = pageNumber => {
    this.setState({
      currentPage: pageNumber,
    })
  }

  //View JSON function
  viewJSON = () => {
    if((this.state.startID>=1 && this.state.startID<this.state.maxID) &&(this.state.maxID<=50 && this.state.maxID>this.state.startID)){
      return(
        <a href={`${url}/apps/range=by=id_start=${this.state.startID}&max=${this.state.maxID}`}>
          <button>View JSON</button>
        </a>
      )
    }else{
      return(
        <a href={`${url}/apps/`}>
          <button>View JSON</button>
        </a>
      )
    }
  }

  render() {
    //Get current item
    const indexOfLastItem = this.state.currentPage * this.state.postsPerPage
    const indexOfFirstItem = indexOfLastItem - this.state.postsPerPage
    const currentItems = this.state.items.slice(
      indexOfFirstItem,
      indexOfLastItem
    )

    return (
      <div>
        <h1 className="col-lg-12 align-center">MDLive Project</h1>
        <h3>{this.state.warningBanner}</h3>
        <h3>Search by ID</h3>
        <input
          type="text"
          value={this.state.startID}
          name="startID"
          placeholder="start ID (ex: 1)"
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          value={this.state.maxID}
          name="maxID"
          placeholder="max ID (ex: 50)"
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchByID}>Search</button>

        <h3>Search by name</h3>

        <input
          type="text"
          value={this.state.startName}
          name="startName"
          placeholder="start name (ex: my-app-001)"
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          value={this.state.maxName}
          name="maxName"
          placeholder="start name (ex: my-app-050)"
          onChange={this.handleInputChange}
        />
        <button onClick={this.searchByName}>Search</button>

        <Posts
          items={currentItems}
          loading={this.state.loading}
        />
        <Pagination
          totalItems={this.state.items.length}
          itemsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
        />
        {this.viewJSON()}
      </div>
    )
  }
}

export default App
