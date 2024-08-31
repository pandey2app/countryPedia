import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../assets/loader.css"
import { useDispatch } from 'react-redux'
import { fetchCountriesAction } from '../redux/actions/countryPedia.actions'

export default function Loading() {
    const navigate = useNavigate()
    const { name } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountriesAction(name))
        setTimeout(() => {
            navigate(`/country/${name}`)
        }, 500)
    }, [])
    return (
        <div className='h-screen relative w-full'>
            <div className='h-20 w-20 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]'>
                <svg className="spinner" width="95px" height="95px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>

        </div>
    )
}
