import axios from 'axios'
import { BASE_URL } from 'configs';


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});


export {
    instance as axiosInstance
}