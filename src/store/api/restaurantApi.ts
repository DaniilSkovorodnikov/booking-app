import {api} from "./api.ts";

export const restaurantApi = api.injectEndpoints({
    endpoints: build => ({
        getRestaurants: build.query<any, void>({
            query: () => '/superadmin/restaurants'
        }),
        getRestaurantById: build.query<any, number>({
            query: (id) => `/superadmin/restaurants/${id}`
        }),
        getRestaurantImages: build.query<any, number>({
            query: (id) => `/restaurants/${id}/images`
        })
    }),
    overrideExisting: false
})

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useGetRestaurantImagesQuery
} = restaurantApi
