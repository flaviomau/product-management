import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import icons from 'glyphicons'

import ProductsHome from './ProductsHome'
import Category from './Category'
import Api from './Api'

class Products extends Component{
    constructor(props){
        super(props)
        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.loadCategories = this.loadCategories.bind(this)
        this.renderCategory = this.renderCategory.bind(this)
        this.state = {
            categories: []
        }
    }

    loadCategories(){
        Api.loadCategories()
        .then(res => {
            this.setState({
                categories: res.data
            })
        })
    }
    componentDidMount(){
        this.loadCategories()
    }

    removeCategory(cat){
        Api.removeCategories(cat.id)
        .then(res => {
            this.loadCategories()
        })
    }

    renderCategory(cat){
        return (
            <li key={cat.id}>
                <Link to={`/products/category/${cat.id}`}>{cat.description}</Link>&nbsp;
                <button className='btn btn-sm' onClick={()=>this.removeCategory(cat)}>
                    {icons.cancel}
                </button>
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
                    <div className='card card-sm card-body bg-light'>
                        <input className = 'form-control' type='text' ref='category' placeholder='New category' onKeyUp={this.handleNewCategory}/>
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