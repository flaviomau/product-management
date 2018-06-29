import axios from 'axios'

const host = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategories: () => host.get('categories'),
    removeCategories: (id) => host.delete('categories/' + id)
}

export default apis