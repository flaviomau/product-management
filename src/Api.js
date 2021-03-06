import axios from 'axios'

const host = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategories: () => host.get('categories'),
    removeCategory: (id) => host.delete('categories/' + id),
    createCategory: (category) => host.post('categories', category),
    editCategory: (category) => host.put('categories/' + category.id, category),
    loadCategory: (id) => host.get('categories/' + id),
    createProduct: (product) => host.post('products', product),
    loadProducts: (id) => host.get('products?category=' + id),
    removeProduct: (id) => host.delete('products/' + id),
    readProduct: (id) => host.get('products/' + id),
    editProduct: (product) => host.put('products/' + product.id, product)
}

export default apis