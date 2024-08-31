import { configureStore } from "@reduxjs/toolkit";
import { countryReducer } from  "../reducers/countryPedia.reducer";


export const store = configureStore({
    reducer: countryReducer,
    devTools: process.env.NODE_ENV === "development" ? true : false
})


