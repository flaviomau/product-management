import React, {Component} from 'react'

class Category extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            products: [],
            category: {},
            id: null
        }
    }

    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps){
        if(newProps.match.params.catId !== this.state.id){
            this.loadData(newProps.match.params.catId)
        }            
    }

    loadData(id){
        this.setState({ id })
        this.props.loadProducts(id)
        this.props.loadCategory(id)
    }

    renderProduct(product){
        return(
            <p className='card card-body bg-light' key={product.id}>{product.description}</p>
        )
    }

    render(){
        return (
            <div>
                <h1>{this.props.category && this.props.category.description}</h1>
                {this.props.products.map(this.renderProduct)}
            </div>            
        )
    }
}

export default Category
