import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://restaurants.zapto.org/api/',
    prepareHeaders: (headers) => {
        const token =  localStorage.getItem('token');
        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
    },
})

export const api = createApi({
    endpoints: () => ({}),
    reducerPath: 'api',
    baseQuery: baseQuery,
})
