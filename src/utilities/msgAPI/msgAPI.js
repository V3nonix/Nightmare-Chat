import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = '';

export const msgAPI = createApi({
    baseQuery: fetchBaseQuery({ })
})