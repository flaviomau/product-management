import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap-css-only'

import Home from './Home'
import About from './About'
import Products from './Products'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      products: [],
      category: null
    }

    this.loadCategories = this.loadCategories.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.createCategory = this.createCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.loadCategory = this.loadCategory.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.removeProduct = this.removeProduct.bind(this)    
  }

  loadCategories(){
    this.props.Api.loadCategories()
    .then(res => {
      this.setState({
        categories: res.data
      })
    })
  }

  removeCategory(cat){
    this.props.Api.removeCategory(cat.id)
    .then(res => {
      this.loadCategories()
    })
  }

  createCategory(cat){
    this.props.Api.createCategory(cat)
    .then(res => {
      this.loadCategories()
    })
  }

  editCategory(cat){
    this.props.Api.editCategory(cat)
    .then(res => {
      this.loadCategories()
    })
  }

  createProduct(prod){
    return this.props.Api.createProduct(prod)
  }

  loadProducts(prod){
    this.props.Api.loadProducts(prod)
    .then(res => {
      this.setState({
        products: res.data
      })
    })
  }

  loadCategory(cat){
    this.props.Api.loadCategory(cat)
    .then(res => {
      this.setState({
        category: res.data
      })
    })
  }

  removeProduct(prod){
    return this.props.Api.removeProduct(prod.id)    
  }

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
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='about'>About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home}/>
            <Route path='/products' render={ (props) => {
                  return (
                    <Products 
                      {...props}
                      loadCategories={this.loadCategories}
                      removeCategory={this.removeCategory}
                      createCategory={this.createCategory}
                      editCategory={this.editCategory}
                      loadCategory={this.loadCategory}
                      createProduct={this.createProduct}
                      loadProducts={this.loadProducts}
                      removeProduct={this.removeProduct}
                      categories={this.state.categories}                                                                
                      products={this.state.products}
                      category={this.state.category}                      
                    />
                  )
                }
              }
            />
            <Route exact path='/about' component={About}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
