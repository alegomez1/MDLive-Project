import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

axios.defaults.withCredentials = false
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
// registerServiceWorker();
