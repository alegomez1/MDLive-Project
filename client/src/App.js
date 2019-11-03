import React, { Component } from 'react'
import './App.css';
import axios from 'axios'
import Posts from './Posts';
import Pagination from './Pagination';

let url = 'http://localhost:5000'
// let url = 'https://mdlive-project.herokuapp.com'

class App extends Component {
  constructor(props){
    super(props)
  this.state={
    startID: '',
    maxID: '',
    currentPage: 1,
    postsPerPage: 5,
    items: []
  }
  this.handleInputChange = this.handleInputChange.bind(this)
}

  searchByID = () =>{
    console.log('search func')
    axios.get(`${url}/apps/range=by=id_start=${this.state.startID}&max=${this.state.maxID}`)
    .then(response=>{
      console.log('axios response---', response)
      this.setState({
        items: response.data
      })
      console.log('new state---', this.state)
    })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  

    //changePage

    paginate = (pageNumber) => {
      this.setState({
        currentPage : pageNumber
      })
    }


  render () {

      //Get current item
  const indexOfLastItem = this.state.currentPage * this.state.postsPerPage;
  const indexOfFirstItem = indexOfLastItem - this.state.postsPerPage;
  const currentItems = this.state.items.slice(indexOfFirstItem, indexOfLastItem)





    return (
      <div>
        <h1 className='col-lg-12 align-center'>MDLive Project</h1>
        <h3>How would you like to search?</h3>
        <input type="text" value={this.state.startID} name="startID" placeholder='enter a startID' onChange={this.handleInputChange}/>
        <input type="text" value={this.state.maxID} name="maxID" placeholder='enter a maxID' onChange={this.handleInputChange}/>
        <button onClick={this.searchByID}>Search</button>

        <Posts items={currentItems} loading={this.state.loading}/>
        <Pagination totalItems={this.state.items.length} itemsPerPage={this.state.postsPerPage} paginate={this.paginate}/>
      </div>
    );
  }
}

export default App
