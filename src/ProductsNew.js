import React, { Component } from 'react'

class ProductsNew extends Component{
    constructor(props){
        super(props)
        this.handleNewProduct = this.handleNewProduct.bind(this)
    }

    handleNewProduct(){
        const product = {
            description: this.refs.description.value,
            category: this.refs.category.value
        }
        this.props.createProduct(product)
    }

    render(){
        const { categories } = this.props
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