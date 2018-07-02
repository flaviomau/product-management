import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import icons from 'glyphicons'

import ProductsHome from './ProductsHome'
import ProductsNew from './ProductsNew'
import ProductEdit from './ProductEdit'
import Category from './Category'


class Products extends Component{
    constructor(props){
        super(props)

        this.state = {
            editingCategory: ''
        }

        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.handleEditCategory = this.handleEditCategory.bind(this)
        this.renderCategory = this.renderCategory.bind(this)
        this.doEditCategory = this.doEditCategory.bind(this)
        this.cancelEditCategory = this.cancelEditCategory.bind(this)
    }

    
    componentDidMount(){
        this.props.loadCategories()
    }

    doEditCategory(cat){
        this.setState({
            editingCategory: cat.id
        })
    }

    cancelEditCategory(cat){
        this.setState({
            editingCategory: ''
        })
    }

    renderCategory(cat){
        return (
            <li key={cat.id}>
                {
                    this.state.editingCategory === cat.id &&
                    <div className='input-group'>
                        <div className='input-group-append' >
                            <input type='text' ref={'cat-'+cat.id} className='form-control' defaultValue={cat.description} onKeyUp={this.handleEditCategory} />
                            <button className='btn' onClick = {()=> this.cancelEditCategory()}>
                                {icons.noEntry}
                            </button>
                        </div>                        
                    </div>
                }
                {
                    this.state.editingCategory !== cat.id &&
                    <div>                        
                        <button className='btn btn-sm btn-info' style={{margin: 5}} onClick={()=>this.doEditCategory(cat)}>
                            {icons.pencil}
                        </button>
                        <button className='btn btn-sm btn-danger' style={{margin: 5}} onClick={()=>this.props.removeCategory(cat)}>
                            {icons.cancel}
                        </button>
                        <Link to={`/products/category/${cat.id}`}>{cat.description}</Link>&nbsp;
                    </div>
                }
            </li>
        )
    }

    handleEditCategory(key){
        if(key.keyCode === 13){
            this.props.editCategory({
                id: this.state.editingCategory,
                description: this.refs['cat-' + this.state.editingCategory].value
            })
            this.setState({
                editingCategory: ''
            })
        }        
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
        const { match, categories, products, category, createProduct, loadProducts, removeProduct, loadCategory } = this.props        
        return (            
            <div className='row'>            
                <div className='col-md-2'>
                    <h3>Category</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categories.map(this.renderCategory)}
                    </ul>
                    <div className='card card-sm card-body bg-light'>
                        <input className = 'form-control' 
                            type='text' 
                            ref='category' 
                            placeholder='New category' 
                            onKeyUp={this.handleNewCategory}
                        />
                    </div>
                    <Link to='/products/new'>New product</Link>                    
                </div>
                <div className='col-md-10'>                    
                    <h1>Products</h1>   
                    <Route exact path={match.url} component={ProductsHome}/>
                    <Route exact path={match.url+'/new'} render={(props) => {
                        return <ProductsNew 
                            {...props}
                            categories={categories}
                            createProduct={createProduct}                            
                        />
                    }}/>
                    <Route path={match.url+'/edit/:id'} render={(props) => {
                        return <ProductEdit 
                            {...props}
                            categories={categories}
                            readProduct={this.props.readProduct}
                            editProduct={this.props.editProduct}
                        />
                    }}/>
                    <Route exact path={match.url+'/category/:catId'} render={(props)=>{
                        return <Category 
                            {...props}
                            loadProducts={loadProducts}
                            loadCategory={loadCategory}
                            removeProduct={removeProduct}
                            products={products}
                            category={category}
                        />
                    }}/>
                </div>
            </div>
        )
    }
}

export default Products