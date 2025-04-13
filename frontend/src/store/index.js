import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducers/clientReducer"

const store = configureStore({
    reducer: {
        client: clientReducer
    },
})

export default store