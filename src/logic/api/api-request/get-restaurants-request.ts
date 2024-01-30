interface Restaurant {
    name: string,
    score: number,
    address: string,
    id: number,
}


interface NewRestaurantDetails {
    name?: string,
    address: string,
    score?: number
}

interface RestaurantInvalid {
    name?: string,
    address: string,
    score?: number
}

export { Restaurant, NewRestaurantDetails, RestaurantInvalid }
