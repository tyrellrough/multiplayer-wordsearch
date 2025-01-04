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

        getNewGameName: builder.query({
            query: () => 'words/threeRandomWords',
        }),

        getCategories: builder.query({
            query: ()  => `categories`
        }),

        getNewGameGuid: builder.query({
            query: () => 'game/newGUID'
        })



    }),
})

export const { useGetWordsByCategoryQuery , useGetCategoriesQuery,
    useGetNewGameNameQuery, useGetNewGameGuidQuery} = wordSearchAPI;