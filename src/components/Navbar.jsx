import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../index.css'
import { fetchCountriesAction } from '../redux/actions/countryPedia.actions';

export default function Navbar() {
    const regions = useSelector((store) => store.regions);
    const regionsDisp = useRef()
    const dispatch = useDispatch()

    const regionsClick = () => {
        regionsDisp.current.classList.toggle('dropdownClose');
    }

    useEffect(() => {
        dispatch(fetchCountriesAction())
    }, [])

    return (
        <div className='border-b-2 bg-slate-50 h-auto mt-2 flex py-3 border-b-black'>
            <ul className='flex justify-evenly w-full  gap-4 px-3 font-semibold h-[45px]'>
                <li className='text-2xl border-2 border-red-600 px-3 py-2 flex-1 text-center rounded-lg bg-sky-300'>
                    <NavLink to='/all-countries'>All Countries</NavLink>
                </li>
                <div
                    className='flex flex-wrap'>
                    <li
                        onClick={regionsClick}
                        className='text-2xl border-2 border-red-600 px-3 py-2 flex-1 text-center rounded-lg bg-sky-300  cursor-pointer'>
                        Regions
                        <FontAwesomeIcon icon={faAngleDown} className='ms-2 font-bold' />
                    </li>
                    <div
                        ref={regionsDisp}
                        className='w-full bg-slate-300 max-h-[0px] overflow-hidden  shadow-xl shadow-black z-10 transition-all'>
                        <ul>
                            {
                                regions.length > 0 ? regions.map((region, index) => (
                                    <li
                                        key={index}
                                        className='text-xl font-semibold  bg-white border-b-2 cursor-pointer h-[35px] overflow-hidden'>
                                        <NavLink
                                            to={`/all-countries/${region}`}
                                            onClick={regionsClick}
                                            className='w-full bg-sky-200 hover:bg-sky-300 inline-block py-1 px-2'>{region}</NavLink>
                                    </li>
                                )) : ''
                            }
                        </ul>
                    </div>
                </div>
                <li className='text-2xl border-2 border-red-600 px-3 py-2 flex-1 text-center rounded-lg bg-sky-300'>
                    <NavLink to='/languages/:name'>Languages</NavLink>
                    <FontAwesomeIcon icon={faAngleDown} className='ms-2 font-bold' />
                </li>
                <li className='text-2xl border-2 border-red-600 px-3 py-2 flex-1 text-center rounded-lg bg-sky-300'>
                    <NavLink to='/currencies/:name'>Currencies</NavLink>
                    <FontAwesomeIcon icon={faAngleDown} className='ms-2 font-bold' />
                </li>
                <li className='text-2xl border-2 border-red-600 px-3 py-2 flex-1 text-center rounded-lg bg-sky-300'>
                    <NavLink to='/timezones/:name'>Time-Zones</NavLink>
                    <FontAwesomeIcon icon={faAngleDown} className='ms-2 font-bold' />
                </li>

            </ul>

        </div >
    )
}
