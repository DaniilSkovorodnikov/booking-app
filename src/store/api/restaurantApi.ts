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
        }),
        getTags: build.query<string[], number>({
            query: (id) => `/client/restaurants/${id}/tags`
        }),
        checkExistsTables: build.mutation({
            query: body => ({
                body,
                url: `/client/restaurants/${body.restaurantId}/tables/exist`,
                method: 'POST'
            })
        }),
        postBooking: build.mutation({
            query: body => ({
                body,
                url: `/client/restaurants/tables/${body.tableId}/booking`,
                method: 'POST'
            })
        }),
        getFreeBookingTime: build.query({
            query: ({restaurantId, tableId, date}) => `/client/restaurants/${restaurantId}/tables/${tableId}/schedule?date=${date}`
        }),
        getUserInfo: build.query<any, void>({
            query: () => 'client/user'
        }),
        getMyBookings: build.query<any, void>({
            query: () => 'client/user/bookings'
        })
    }),
    overrideExisting: false
})

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useGetRestaurantImagesQuery,
    useGetTagsQuery,
    useCheckExistsTablesMutation,
    usePostBookingMutation,
    useGetFreeBookingTimeQuery,
    useGetUserInfoQuery,
    useGetMyBookingsQuery
} = restaurantApi
