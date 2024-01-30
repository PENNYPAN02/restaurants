import { request } from "@playwright/test"
import { NewRestaurantDetails, Restaurant } from "../../logic/api/API-Request/get-restaurants-request"

const postRequest = async (url: string, data?: any) => {
    const context = await request.newContext()
    return await context.post(url, {
        data: data ? data : ''
    })
}

const getRequest = async (url: string, param?: any) => {
    const context = await request.newContext()
    return await context.get(url, {
        params: {
            'id': param,
        }
    })
}

const patchRequest = async (url: string, param: number, body?: NewRestaurantDetails) => {
    const context = await request.newContext()
    return await context.patch(url, {
        params: {
            'restaurantId': param,
        },
        data: body ? body : ''
    })
}

const deleteRequest = async (url: string, param: number) => {
    const context = await request.newContext()
    return await context.delete(url, {
        params: {
            'restaurantId': param,
        }
    })
}

export { postRequest, getRequest, deleteRequest, patchRequest }