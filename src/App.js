import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap-css-only'

import Home from './Home'
import About from './About'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className='container'>
              <a className="navbar-brand" href="/">Product management</a>
              <ul className="navbar-nav">
                <li className="nav-item active">
                <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Products</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='about'>About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' component={About}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
