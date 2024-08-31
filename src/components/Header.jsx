import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCountriesNameAction } from '../redux/actions/countryPedia.actions';

export default function Header() {
    const [input, setInput] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const countriesName = useSelector((store) => store.countriesName);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputElm = useRef()
    const submitBtn = useRef()

    const submit = (e) => {
        e.preventDefault()
        console.log(input);
        if (input && isNaN(input)) {
            try {
                navigate(`/loading/${input}`)

            } catch (error) {
                console.log(error);
            }
        } else {
            setInput('Invalid !')
            inputElm.current.style.color = 'red'
            setTimeout(() => {
                setInput('')
            }, 1000)
            return

        }
        setInput('')

    }
    const inputChange = (e) => {
        setSuggestion(countriesName.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
        setInput(e.target.value)
    }

    const onLIClick = (event) => {
        setInput(event.target.innerText)
        setSuggestion('')
        inputElm.current.focus()
        navigate(`/loading/${event.target.innerText}`)
    }

    useEffect(() => {
        dispatch(fetchCountriesNameAction());

    }, [])


    return (
        <div className='border-2 bg-slate-50 h-auto  flex py-3 border-b-black'>
            <div className='w-1/12  content-center  text-center'>
                <button><i className="fa fa-bars text-5xl hover:text-green-700"></i></button>
            </div>
            <div className='w-9/12 content-center'>
                <h1 style={{
                    textShadow: '2px 2px 2px black'
                }}
                    onClick={() => navigate(`/`)}
                    className='text-center text-5xl font-serif text-red-600 font-bold cursor-pointer'>CountryPedia</h1>
            </div>
            <div className='w-2/12  content-center'>
                <form action="" onSubmit={submit}>
                    <div className='relative'>
                        <div className='flex  relative text-2xl text-blue-400 me-2'>
                            <input
                                type="text"
                                placeholder='Search'
                                value={input}
                                onChange={inputChange}
                                ref={inputElm}
                                className='w-full  px-3 py-1 outline'
                            />
                            <button
                                type="submit"
                                ref={submitBtn}
                                className='absolute right-2'
                            ><i className="fa fa-search"></i></button>
                        </div>
                        <div className='w-full bg-slate-300 absolute top-[37px] max-h-[200px] overflow-y-auto  shadow-xl shadow-black'>
                            <ul>
                                {
                                    suggestion.length > 0 ? suggestion.map((country, index) => (
                                        <li
                                            key={index}
                                            onClick={onLIClick}
                                            className='text-xl font-semibold py-1 px-2 bg-white border-b-2 cursor-pointer h-[35px] text-ellipsis overflow-hidden'>
                                            {country.name.common}
                                        </li>
                                    )) : ''
                                }
                            </ul>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}
