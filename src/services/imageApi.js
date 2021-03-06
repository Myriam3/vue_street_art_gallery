import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // serve json image file with json-server
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    getImages() {
        return apiClient.get('/photos')
    },
    getImagesByCountry(country) {
        return apiClient.get('/photos', {
            params: {
                country: country
            }
        })
    }
}