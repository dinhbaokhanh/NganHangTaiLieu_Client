import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth.js'
import api from './api/api.js'

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer, // Reducer cho auth
    [api.reducerPath]: api.reducer, // Reducer cho api
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
