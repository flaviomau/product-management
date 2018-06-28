import React, {Component} from 'react'

class Category extends Component{
    render(){
        return <h1>Category {this.props.match.params.catId}</h1>
    }
}

export default Category
