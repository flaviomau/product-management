import axios from 'axios'

const host = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategories: () => host.get('categories'),
    removeCategory: (id) => host.delete('categories/' + id),
    createCategory: (category) => host.post('categories', category),
    editCategory: (category) => host.put('categories/' + category.id, category)
}

export default apis