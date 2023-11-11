import axios from 'axios'

const apiUrl = 'http://localhost:5437/Cars'

const stringToNumber = (price) => Number(price)

export const CarServices = {

    async getAll() {
        const url = apiUrl
        const response = await axios.get(url)
        return response.data
    },

    async getById(id) {
        const url = `${apiUrl}/car?id=${id}`
        const response = await axios.get(url)
        return response.data
    },

    async create(data) {
        const url = `${apiUrl}/car/create`
        data.price = stringToNumber(data.price)
        return await axios.post(url, data)
    },

    async delete(id) {
        const url = `${apiUrl}/car?id=${id}`
        return await axios.delete(url)
    },

    async update(id, data) {
        const url = `${apiUrl}/car?id=${id}`
        data.price = stringToNumber(data.price)
        const response = await axios.put(url, data)
        return response.data
    }

}