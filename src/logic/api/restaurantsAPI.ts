
import jsonConfig from '../../../config.json';
import { getRequest, postRequest, deleteRequest, patchRequest } from '../../infra/rest/api-request';
import { Restaurant, NewRestaurantDetails, RestaurantInvalid } from './API-Request/get-restaurants-request';

const baseUrl = jsonConfig.baseUrl + '/';

const getRestaurants = async () => {
    return getRequest(baseUrl + 'restaurants');

}

const resetServer = async () => {
    return postRequest(baseUrl + 'reset');

}

const createRestaurant = async (body: Restaurant) => {
    return postRequest(baseUrl + 'restaurant', body)
}

const createRestaurantInvalidData = async (body: RestaurantInvalid) => {
    return postRequest(baseUrl + 'restaurant', body)
}

const getRestaurantById = async (id: number) => {
    return getRequest(baseUrl + 'restaurant', id);

}

const updateRestaurantById = async (id: number, body: NewRestaurantDetails) => {
    return patchRequest(baseUrl + 'restaurant', id, body);

}

const deleteRestaurantById = async (id: number) => {
    return deleteRequest(baseUrl + 'restaurant', id);

}

export default { getRestaurants, resetServer, createRestaurant, getRestaurantById, deleteRestaurantById, updateRestaurantById, createRestaurantInvalidData }