import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.js'
import api from './api/api.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: import.meta.env.MODE !== 'production',
})

export default store
