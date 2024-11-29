import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const wordSearchAPI = createApi({
    reducerPath: 'wordSearchAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7033/api'}),
    endpoints: (builder) => ({
        getWordsByCategory: builder.query({
            query: (argumentObject)  => {
                const {categoryName, maxNumberOfWords, maxWordLength} = argumentObject;
                return {
                    url: `words?categoryName=${categoryName}&numRecordsReturn=${maxNumberOfWords}&maxWordSize=${maxWordLength}`,
                }
            }
        }),

        getCategories: builder.query({
            query: ()  => `categories`
        })

    }),
})

export const { useGetWordsByCategoryQuery , useGetCategoriesQuery} = wordSearchAPI;