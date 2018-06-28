import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import ProductsHome from './ProductsHome'
import Category from './Category'

class Products extends Component{
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/categories')
            .then(res => {
                this.setState({
                    categories: res.data
                })
            })
    }

    renderCategory(cat){
        return (
            <li key={cat}>
                <Link to={`/products/category/${cat.id}`}>{cat.category}</Link>
            </li>
        )
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