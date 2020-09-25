import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import './Home.css';

const Home = () => {
    const history = useHistory();
    const handleDestinationInfo = (id) =>{
        history.push(`/destinationInfo/${id}`);
    }
    return (
        <div className="container-fluid home-container">
            <div className="container">
                <div className="card-deck">
                    {
                        fakeData.map(spot =>
                            <div className="customCard bg-none" key={spot.id}>
                                <img className="card-img-top" src={spot.img} />
                                <div className="card-body ">
                                    <h3 className="card-title">{spot.spotName}</h3>
                                    <p className="card-text">{spot.highlight} </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-warning" onClick={() => handleDestinationInfo(spot.id)}>Booking </button>
                                </div>
                            </div>
                        )
                    }
                </div>   

            </div>
        </div>
    );
};

export default Home;