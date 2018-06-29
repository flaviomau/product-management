import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProductsNew extends Component{
    constructor(props){
        super(props)
        this.handleNewProduct = this.handleNewProduct.bind(this)
        this.state = {
            redirect: false
        }
    }

    handleNewProduct(){
        const product = {
            description: this.refs.description.value,
            category: this.refs.category.value
        }
        this.props.createProduct(product).then(
            (res) => this.setState({
                redirect: '/products/category/' + product.category
            })
        )
    }

    render(){
        const { categories } = this.props

        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <h2>New Product</h2>
                <select ref='category'>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.description}</option>)}
                </select>
                <br/>
                <input 
                    placeholder='New product description'
                    className='form-control'
                    ref='description'
                />
                <button className='btn btn-primary' onClick={this.handleNewProduct}>Save</button>
            </div>
        )
    }
}

export default ProductsNew