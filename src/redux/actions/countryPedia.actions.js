
import { FETCH_COUNTRIES, FETCH_COUNTRIES_NAME, FETCH_COUNTRY } from "../constants/countryPedia.constants"

export const fetchCountriesAction = () => async (dispatch) => {
    
    let response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,cca3");
    let data = await response.json();
    let regions = [...new Set(data.map((country) => country.region))]

    dispatch({
        type: FETCH_COUNTRIES,
        payload: {countries : data, regions}

    })
}


export const fetchCountryAction = (name) => async (dispatch) => {
    let response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    let data = await response.json();

    dispatch({
        type: FETCH_COUNTRY,
        payload: data
    })
}

export const fetchCountriesNameAction = () => async (dispatch) => {
    
    let response = await fetch("https://restcountries.com/v3.1/all?fields=name");
    let data = await response.json();

    dispatch({
        type: FETCH_COUNTRIES_NAME,
        payload: data
    })
}

