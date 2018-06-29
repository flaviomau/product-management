import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component{
    constructor(props){
        super(props)
        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.loadCategories = this.loadCategories.bind(this)
        this.state = {
            categories: []
        }
    }

    loadCategories(){
        axios.get('http://localhost:3001/categories')
            .then(res => {
                this.setState({
                    categories: res.data
                })
            })
    }
    componentDidMount(){
        this.loadCategories()
    }

    renderCategory(cat){
        return (
            <li key={cat.id}>
                <Link to={`/products/category/${cat.id}`}>{cat.description}</Link>
            </li>
        )
    }

    handleNewCategory(key){
        if(key.keyCode === 13){
            axios.post('http://localhost:3001/categories', {
                description: this.refs.category.value
            }).then(res => {
                this.refs.category.value = ''
                this.loadCategories()                
            })
        }
    }

    render(){
        const { match } = this.props
        const { categories } = this.state
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Category</h3>
                    <ul>
                        {categories.map(this.renderCategory)}
                    </ul>
                    <div className='card card-body bg-light'>
                        <input type='text' ref='category' placeholder='New category' onKeyUp={this.handleNewCategory}/>
                    </div>
                </div>
                <div className='col-md-10'>                    
                    <h1>Products</h1>
                    <Route exact path={match.url} component={ProductsHome}/>
                    <Route exact path={match.url+'/category/:catId'} component={Category}/>
                </div>
            </div>
        )
    }
}

export default Products