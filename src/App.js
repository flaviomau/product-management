import React, { Component } from 'react'
import 'bootstrap-css-only'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className='container'>
            <a className="navbar-brand" href="/">Product management</a>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          <h1> Product management</h1>
        </div>
      </div>
    )
  }
}

export default App
