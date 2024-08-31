import React, { useEffect, useState } from 'react';
import googleMap from '../../public/assets/images/googleMap.jpg'
import { Link } from 'react-router-dom';

const GoogleMap = ({ link }) => {
    const [src, setSrc] = useState('');

    const changeLocation = (link) => {
        setSrc(link);
    };

    useEffect(() => {
        changeLocation(link)
        console.log(link);
    }, [])

    return (
        <div className='p-2 h-[400px]'>
            <Link to={link}>
                <div id="map-container" style={{
                    width: '100%',
                    height: '100%',
                    border: '1px solid #ccc',
                    backgroundImage: 'url(' + googleMap + ')',
                    backgroundSize: 'contain',
                }}>

                </div >
            </Link>
        </div>

    );
};

export default GoogleMap;
