import React, {Component} from 'react'
import axios from 'axios'

class Category extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            products: [],
            category: {}
        }        
    }

    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps){
        const id = newProps.match.params.catId
        this.loadData(id)
    }

    loadData(id){
        axios
            .get('http://localhost:3001/products?category=' + id)
            .then(res => {
                this.setState({
                    products: res.data
                })
            })

        axios
            .get('http://localhost:3001/categories/' + id)
            .then(res => {
                this.setState({
                    category: res.data
                })
            })
    }

    renderProduct(product){
        return(
            <p className='card card-body bg-light' key={product.id}>{product.description}</p>
        )
    }

    render(){
        return (
            <div>
                <h1>{this.state.category.description}</h1>
                {this.state.products.map(this.renderProduct)}
            </div>            
        )
    }
}

export default Category
