import axios, {type AxiosInstance, type AxiosResponse} from 'axios'
const AxiosClient:AxiosInstance = axios.create({
    baseURL:import.meta.env.BACKEND_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

//Request Interceptor
axios.interceptors.request.use(
    (config) =>{
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//Response interceptor
axios.interceptors.response.use(
    (response: AxiosResponse) =>{
        return response.data;
    },
    (error) => {
        const message = error?.response?.data?.message || "Something went wrong";
        console.error("Api response: ",message);
        return Promise.reject(error);
    }
)
export default AxiosClient;