import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducers/clientReducer"
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        client: clientReducer,
        user: userReducer,
    },
})

export default store