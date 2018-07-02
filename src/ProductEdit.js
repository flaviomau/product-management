import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class ProductEdit extends Component{
    constructor(props){
        super(props)
        this.handleEditProduct = this.handleEditProduct.bind(this)
        this.state = {
            redirect: ''
        }
    }
    componentDidMount(){
        this.props.readProduct(this.props.match.params.id)
        .then(res => {

            this.refs.description.value = res.data.description
            this.refs.category.value = res.data.category
        })
    }

    handleEditProduct(){
        const product = {
            id: this.props.match.params.id,
            description: this.refs.description.value,
            category: this.refs.category.value
        }
        this.props.editProduct(product).then(
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

        return(
            <div>
                <h2>Edit Product</h2>
                
                <select ref='category' style={{margin: 5}}>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.description}</option>)}
                </select>
                <br />
                <input
                    placeholder='New product description'
                    className='form-control'
                    ref='description'
                    style={{margin: 5}}
                />
                <button className='btn btn-primary' onClick={this.handleEditProduct} style={{margin: 5}}>Save</button>
            </div>
        )
    }
}

export default ProductEdit