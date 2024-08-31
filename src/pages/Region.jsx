
import React, { useCallback, useEffect } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountriesAction } from '../redux/actions/countryPedia.actions'
import mapBg from '../../public/assets/images/map.jpg'
import { useNavigate } from 'react-router-dom';

export default function Region() {
    const countries = useSelector((store) => store.countries);
    const regionCountries = useSelector((store) => store.regionCountries);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getCountries = useCallback(() => {
        dispatch(fetchCountriesAction())
    }, [dispatch])


    const handleCardClick = (name) => {
        navigate(`/country/${name}`);
    }

    useEffect(() => {
        getCountries();
    }, [getCountries])

    return (
        <>
            <Header />
            <Navbar />
            <section
                style={{
                    backgroundImage: 'url(' + mapBg + ')',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: 'fixed'
                }}
                className='flex h-auto p-2 gap-2 flex-wrap w-full'>
                {
                    countries.length > 0 && countries.map((country, index) => (
                        <div
                            onClick={() => handleCardClick(country.name.common)}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)'
                            }}
                            key={index}
                            className='w-[32.9%] h-32 border-2 border-red-500 hover:border-green-800 flex gap-1 p-1 box-border cursor-pointer'
                        >
                            <div className='w-4/12 h-full flex content-center'>
                                <img src={country.flags.svg} alt="" className='w-full h-full' />
                            </div>
                            <div className='w-8/12 bg-sky-300 h-full'>
                                <h3 className='bg-red-400 font-bold text-center p-1 text-xl'>{country.name.common}</h3>
                                <p className='text-right font-semibold pe-2 border-b-2 border-black text-lg'>{country.region}</p>
                                <p className='text-center pt-1'>{country.name.official}</p>
                            </div>
                        </div>
                    ))
                }

            </section>
            <Footer />
        </>
    )
}
