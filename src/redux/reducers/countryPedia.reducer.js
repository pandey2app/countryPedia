import { FETCH_COUNTRIES, FETCH_COUNTRIES_NAME, FETCH_COUNTRY } from "../constants/countryPedia.constants";

const initialState = {
    countries: [],
    country: null,
    countriesName: [],
    regions: []
}

export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return ({
                ...state,
                countries: [...action.payload.countries],
                regions: [...action.payload.regions]
            })
        case FETCH_COUNTRY:
            return ({
                ...state,
                country: action.payload[0]
            })
        case FETCH_COUNTRIES_NAME:
            return ({
                ...state,
                countriesName: [...action.payload]
            })
        default: return state;
    }
}

