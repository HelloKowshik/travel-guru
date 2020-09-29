import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import hotelData from '../../utils/fakeData/hotelData';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Listing = () => {

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };
    const APP_KEY = 'AIzaSyClIWsgWM2_ArBrugaeuz8IWPeE2LhiTEk';
   
    const { loggedUser } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedUser;

    const { areaName } = useParams();
    
    const filteredHotels = hotelData.filter(hotel => hotel.area === areaName);
    
    return (
        <Container style={{backgroundColor: 'black', color: 'gray'}}>
            <Header currentUser={loggedInUser.name || loggedInUser.email} />
            <hr className="hr-header" />
            <div className="d flex">
                <p>176 stays Sep 19-25 guests</p>
                <h4 className="font-weight-bold">Stay in {areaName}</h4>
            </div>
            <Row>
                <Col className="w-50 mb-2" >
                    {
                        filteredHotels.map(hotel =>
                            <Row key={hotel.id}>
                                <Col className="w-50" md={6} xs={12}>
                                    <img className="w-100" src={hotel.img} alt="" /> <br />
                                </Col>
                                <Col className="w-50" md={6} xs={12}>
                                    <h5 className="font-weight-bold"> {hotel.name} </h5>
                                    <p>{hotel.features}</p>
                                    <p className="font-weight-bold">Total Ratings: {hotel.feedback}</p>
                                    <p className="font-weight-bold">Rate/Night: {hotel.rate}</p>
                                    <p className="font-weight-bold">Other Fetures: {hotel.info}</p>
                                </Col>
                            </Row>

                        )
                    }
                </Col>
                <Col className="w-50">
                <LoadScript googleMapsApiKey={APP_KEY}>        
                <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={filteredHotels[0].cords}>
               {
                  filteredHotels.map(item => {
                    return (
                    <Marker key={item.id} position={item.cords}/>
                    )
                  })
               }
           </GoogleMap>
           </LoadScript>
                </Col>
            </Row>
        </Container>
    );
};

export default Listing;