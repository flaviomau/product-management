import React, {Component} from 'react'

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
        this.props.loadProducts(id)
            /*.then(res => {
                this.setState({
                    products: res.data
                })
            })*/
        this.props.loadCategory(id)
            /*.then(res => {
                this.setState({
                    category: res.data
                })
            })*/
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
                {this.props.products.map(this.renderProduct)}
            </div>            
        )
    }
}

export default Category
