import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import api from '../api'
import Navbar from './Navbar'
import Home from './Home'
// import Signup from './Signup'
import UserProfile from './UserProfile'
import AddPet from './AddPet'
import UniqueUser from './UniqueUser'
import Login from './Login'
import Search from './Search'
import Axios from 'axios'
import NewSignup from './NewSignup'
import SendEmail from './SendEmail'
import GoogleMaps from './GoogleMaps'

// const url = 'http://localhost:5000'
const url = 'https://pawnderapp.herokuapp.com'

// Components

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }
  handleLogoutClick = e => {
    api.logout().then(res => {
      console.log('lougout')
      this.setState({ user: {} })
    })
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    let user = await Axios.get(`${url}/api/getUser`).catch(err =>
      console.error(err)
    )
    // console.log(user)
    this.setState({ user: user.data })
  }

  toggleHasPet = () => {
    this.setState({
      hasPet: !this.state.hasPet,
    })
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route
            exact
            path="/"
            component={<Home/>}
          />
        </Switch>
      </div>
    )
  }
}
