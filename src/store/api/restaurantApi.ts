import {api} from "./api.ts";

export const restaurantApi = api.injectEndpoints({
    endpoints: build => ({
        getRestaurants: build.query<any, void>({
            query: () => '/superadmin/restaurants'
        })
    }),
    overrideExisting: false
})

export const {
    useGetRestaurantsQuery
} = restaurantApi
