import axios from "axios"
//temp mail revaw48202@huizk.com

// const API_KEY = 'https://65d858a0c96fbb24c1bb4db4.mockapi.io'

const API_BASE_URL = 'http://localhost:5000/api';

export const axiosService = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        headers: { "Content-Type": "multipart/form-data" }
    }
})

    