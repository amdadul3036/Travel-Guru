import React, { useContext } from 'react';
import './accommodation.css'
import bookingInfo from '../../fakeData/bookingInfo';
import GoogleMap from '../GoogleMap/GoogleMap';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';

const Accommodation = () => {
    const {id} = useParams();

    return (
        <div>
            <hr className="bg-white"/>
            <p className="text-white">252 stays Apr 13-17 3 guests</p>
            <h2 className="text-white">Stay in {fakeData[id].spotName}</h2>
            <div className="row">
                <div className="col-md-6 bg-white">
                {bookingInfo.map(hotel =>
                    <div className="d-flex rounded p-3">
                        <img src={hotel.img} className="hotelImg p-2" alt=""/>
                        
                        <div>
                            <h5 className="font-weight-bold">{hotel.title}</h5>
                            <p className="text-secondary"><span>{hotel.guests} guests</span><span>{hotel.bedrooms} bedrooms</span><span>{hotel.beds} beds</span><span>{hotel.baths} baths</span></p>
                            <p className="text-secondary">{hotel.facility}</p>
                            <div className="d-flex">
                                <img src="https://iili.io/2zU1R9.png" className="ratingIcon mt-1" alt=""/>
                                <span className="font-weight-bold"> {hotel.rating} </span><span className="font-weight-bold">({hotel.ratedUser}) </span>
                                <p className="font-weight-bold ml-auto">${hotel.price}/</p><span className="text-secondary">Night</span>
                            </div>
                        </div>
                    </div>
                
                )}
                </div>
                <div className="col-md-6 p-5">
                    <GoogleMap latitude={fakeData[id].latitude} longitude={fakeData[id].longitude}/>
                </div>
            </div>
        </div>
    );
};

export default Accommodation;