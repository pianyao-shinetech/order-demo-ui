import axios from 'axios'
import { ProductPageDTO } from '../types/product_page.dto'

const SERVICE_URL = process.env.REACT_APP_ORDER_DEMO_SERVICE_BASE_URL ?? ''
const SERVICE_KEY = process.env.REACT_APP_ORDER_DEMO_SERVICE_KEY ?? ''

const axiosGet = async (url: string) => {
    let response = await axios.get(url, {
        headers: {
            'x-service-key': SERVICE_KEY,
        },
    })
    return response
}

const axiosPost = async (url: string, data: any) => {
    let response = await axios.post(url, data, {
        headers: {
            'x-service-key': SERVICE_KEY,
        },
    })
    return response
}

const axiosPut = async (url: string, data: any) => {
    let response = await axios.put(url, data, {
        headers: {
            'x-service-key': SERVICE_KEY,
        },
    })
    return response
}

const axiosDelete = async (url: string) => {
    let response = await axios.delete(url, {
        headers: {
            'x-service-key': SERVICE_KEY,
        },
    })
    return response
}

export const searchProduct = async (
    searchText: string | null,
    pageNum: number,
    pageSize: number,
): Promise<ProductPageDTO> => {
    try {
        let url = `${SERVICE_URL}/products?pageNum=${pageNum ? pageNum : 0}&pageSize=${
            pageSize ? pageSize : 20
        }`
        if (searchText) {
            url += `&search=${searchText}`
        }
        let response = await axiosGet(url)
        return response.data as ProductPageDTO
    } catch (error: any) {
        console.error('Error happened during search: ' + error?.message?.toString())
        throw error
    }
}

