import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCountriesAction, fetchCountryAction } from '../redux/actions/countryPedia.actions';
import GoogleMap from '../components/GoogleMap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';


export default function Country() {

  const [loading, setLoading] = useState(true);
  const [countryName, setCountryName] = useState('');
  const { name } = useParams();
  const country = useSelector((store) => store.country);
  const countries = useSelector((store) => store.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCountry = useCallback(() => {
    dispatch(fetchCountryAction(name))
    dispatch(fetchCountriesAction(name))
    setLoading(false)
  }, [dispatch])

  const changeCountry = (borderName) => {
    console.log(borderName);
    navigate(`/loading/${borderName}`)

  }

  useEffect(() => {
    getCountry();
    setCountryName(name);
  }, [getCountry])

  if (loading) {
    return <h3>Loading</h3>
  }

  return (
    <>
      <Header />
      <Navbar />
      {country && (
        <div
          style={{
            backgroundImage: 'url(' + country.flags.svg + ')',
            backgroundSize: "contain",
            backgroundAttachment: 'fixed'
          }}
          className='min-h-[1100px] border-2 m-0'>
          {/* OVERLAY */}
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              backdropFilter: blur('10px'),
            }}
            className='min-h-[900px] w-full'>
            <div
              className='m-auto p-2 w-[90%]'>
              <h2
                className='text-8xl font-serif text-center font-extrabold shadow-black shadow-xl py-2'>
                {country.name.common}
              </h2>
            </div>
            <div
              className='m-auto p-2 w-[90%]'>
              <div className='flex justify-around py-2 px-2 mt-2 flex-wrap  gap-4'>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600 mb-2'>Capital Location</h4>
                  <p className='text-2xl text-center font-semibold text-purple-800'>Latitude : {country.capitalInfo.latlng[0]}</p>
                  <p className='text-2xl text-center font-semibold text-purple-800'>Longitude : {country.capitalInfo.latlng[1]}</p>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Capital city</h4>
                  <p className='text-2xl text-center font-semibold text-purple-800'>{country.capital[0]}</p>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Currency : {Object.entries(country.currencies).map((entry) => (<span key={entry[0]}>{country.currencies[entry[0]].symbol}</span>))}
                  </h4>
                  {Object.entries(country.currencies).map((entry) => (<p key={entry[0]} className='text-lg text-center font-semibold text-purple-800'>Code : {entry[0]} </p>))}
                  {Object.entries(country.currencies).map((entry) => (<p key={entry[0]} className='text-lg text-center font-semibold text-purple-800'>Name : {country.currencies[entry[0]].name}</p>))}
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Geographical Location</h4>
                  <p className='text-2xl text-center font-semibold text-purple-800'>Region : {country.region}</p>
                  <p className='text-2xl text-center font-semibold text-purple-800'>SubRegion : {country.subregion}</p>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Status</h4>
                  <p className='text-2xl text-center font-semibold text-purple-800'>{country.independent ? 'Independent' : 'Not Independent'}</p>
                  <p className='text-2xl text-center font-semibold text-purple-800'>{country.unMember ? 'Un-Member' : 'Not Un-Member'}</p>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>General Statics</h4>
                  <p className='text-2xl text-center font-semibold text-purple-800'>Population : {country.population}</p>
                  <p className='text-2xl text-center font-semibold text-purple-800'>Area : {country.area + ' KM'}<sup>2</sup></p>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>About Flag</h4>
                  <p className='text-lg text-center font-semibold text-purple-800 overflow-y-auto'>{country.flags.alt}</p>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Borders</h4>
                  <div className='flex flex-wrap gap-1 flex-1 justify-evenly  overflow-y-auto h-[120px]'>
                    {
                      country.borders ?
                        country.borders.map((border, index) => {
                          let borderName = countries.filter((cntry) => cntry.cca3 === border)[0]?.name.common
                          let borderNameDisp = borderName.length <= 11 ? borderName
                            :
                            borderName.split(' ').map((word) => word[0].toUpperCase()).join(' ')
                          return <p
                            key={index}
                            title={borderName}
                            onClick={() => changeCountry(borderName)}
                            className='text-2xl font-semibold text-purple-800 w-[40%] border-red-600 border-l-4 box-border ps-2 bg-slate-300 cursor-pointer h-[30px]'
                          >
                            {borderNameDisp}
                          </p>
                        }) :
                        <p className='text-2xl text-center font-semibold text-purple-800'>No Border Country Available</p>
                    }
                  </div>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Languages</h4>
                  <div className='flex flex-wrap gap-1 flex-1 justify-evenly'>
                    {
                      Object.entries(country.languages).map((entry) => (
                        <p key={entry[0]} className='text-2xl font-semibold text-purple-800 w-[40%] border-red-600 border-l-4 box-border ps-2 bg-slate-300'>{entry[1]}</p>
                      ))
                    }
                  </div>
                </div>
                <div className='w-[30%] bg-sky-300  rounded-xl  shadow-black shadow-xl  h-48 overflow-hidden'>
                  <h4 className='text-3xl font-extrabold font-serif text-center bg-slate-300 p-1 text-red-600  mb-2'>Time Zones : {country.timezones.length}</h4>
                  <div className='flex flex-wrap gap-2 flex-1 justify-evenly'>
                    {
                      country.timezones.length ?
                        country.timezones.map((timezone, index) => (
                          <p key={index} className='text-xl font-semibold text-purple-800 w-[30%] border-red-600 border-l-4 box-border ps-2 bg-slate-300'>{timezone}</p>
                        )) :
                        <p className='text-2xl text-center font-semibold text-purple-800'>No TimeZone Available</p>
                    }
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            {/* MAP */}
            <div className='w-[90%] bg-slate-600 m-auto  shadow-black shadow-xl'>
              <GoogleMap link={country.maps.googleMaps}/>
            </div>
            <br />
            <br />
          </div>
        </div>
      )
      }
      <Footer />
    </>
  )
}
