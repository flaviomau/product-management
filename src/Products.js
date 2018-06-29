import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import icons from 'glyphicons'

import ProductsHome from './ProductsHome'
import Category from './Category'


class Products extends Component{
    constructor(props){
        super(props)
        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.renderCategory = this.renderCategory.bind(this)        
    }

    
    componentDidMount(){
        this.props.loadCategories()
    }

    renderCategory(cat){
        return (
            <li key={cat.id}>
                <Link to={`/products/category/${cat.id}`}>{cat.description}</Link>&nbsp;
                <button className='btn btn-sm' onClick={()=>this.props.removeCategory(cat)}>
                    {icons.cancel}
                </button>
            </li>
        )
    }

    handleNewCategory(key){
        if(key.keyCode === 13){
            this.props.createCategory({
                description: this.refs.category.value
            })
            this.refs.category.value = ''
        }
    }

    render(){
        const { match, categories } = this.props        
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