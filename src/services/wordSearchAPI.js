import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const wordSearchAPI = createApi({
    reducerPath: 'wordSearchAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033/api'}),
    endpoints: (builder) => ({
        getWordsByCategory: builder.query({
           query: (categoryName) => `words?categoryName=${categoryName}&numRecordsReturn=5&maxWordSize=5`,
        }),
    }),
})

export const { useGetWordsByCategoryQuery } = wordSearchAPI;