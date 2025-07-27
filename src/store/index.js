import { configureStore } from '@reduxjs/toolkit'
import clientReducer from "./reducers/clientReducer"
import userReducer from './reducers/userReducer'

const preloadedState = {
    user: {
        isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
        currentUser: JSON.parse(localStorage.getItem("currentUser")) || {}
    }
}

const store = configureStore({
    reducer: {
        client: clientReducer,
        user: userReducer,
    },
    preloadedState
})

export default store