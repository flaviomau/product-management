import React, {Component} from 'react'
import icons from 'glyphicons'
import { Link } from 'react-router-dom';

class Category extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.renderProduct = this.renderProduct.bind(this)
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
            <div className="card" key={product.id} style={{ margin: 15 }}>
                <div className="card-header text-right">
                    <Link to={'/products/edit/' + product.id} style={{margin: 5}}>Edit</Link>
                    <button className='btn btn-sm btn-danger' 
                        onClick={() => {
                            this.props.removeProduct(product).then(res => {
                                this.loadData(this.props.match.params.catId)
                            })
                        }}>
                        {icons.cancel}
                    </button>
                </div>
                <div className="card-body">
                    {product.description}
                </div>
            </div>
        )
    }

    render(){
        return (
            <div>
                <h1>{this.props.category && this.props.category.description}</h1>
                {
                    this.props.products.length === 0 && <p className='alert alert-info'>No products in database...</p>
                }
                {this.props.products.map(this.renderProduct)}
            </div>            
        )
    }
}

export default Category
