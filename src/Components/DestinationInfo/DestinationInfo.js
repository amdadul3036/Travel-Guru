import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';


const DestinationInfo = () => {
    const {id} = useParams();
    const history = useHistory();

    const handleBooking = () => {
        history.push(`/accommodation/${id-1}`);
    }
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row text-white">
                    <div className="col-md-6 mt-5">
                        <h1>{fakeData[id-1].spotName}</h1>
                        <p className="mt-3">{fakeData[id-1].details}</p>
                    </div>
                    <div className="col-md-6 mt-5 pl-5">
                        <form onSubmit={handleBooking} className="bg-white w-75 rounded p-4">
                            <div className="form-group">
                                <label className="text-secondary">Origin</label>
                                <input type="text" className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="Where are you from?"/>
                            </div>
                            <div className="form-group">
                                <label className="text-secondary" >Destination</label>
                                <input type="text" className="form-control font-weight-bold bg-light" id="formGroupExampleInput2" placeholder={fakeData[id-1].spotName}/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="text-secondary" >From</label>
                                    <input className="form-control bg-light" type="date" id="example-date-input" required/>
                                </div>
                                <div className="col-md-6">
                                    <label className="text-secondary bg-light" >to</label>
                                    <input className="form-control bg-light" type="date" id="example-date-input" required/>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-warning w-100 p-2 mt-3" value="Booking"/>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DestinationInfo;