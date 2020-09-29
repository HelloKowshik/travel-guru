import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { UserContext } from '../../App';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import areaData from '../../utils/fakeData/areaData';
import Header from '../Header/Header';

const Booking = () => {
    
    const { areaName } = useParams();
    const selectedArea = areaData.find(area => area.areaName === areaName);
    const {loggedUser} = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedUser;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        const duration = 3;
        return today.setDate(today.getDate() + duration)
    });

    return (
        <div className="home-bg text-white">
            <div className="card-overlay">
                <Container>
                    <Header currentUser={loggedInUser.name || loggedInUser.email} />
                    <Row>
                        <Col className="mr-5">
                            <h2>{selectedArea.areaName}</h2>
                            <p>{selectedArea.details}</p>
                        </Col>
                        <Col className="form-area ml-5">
                            <Form>
                                <Form.Group>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        name="origin"
                                        placeholder="DHAKA"
                                        defaultValue=""
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control
                                        name="destination"
                                        placeholder={areaName}
                                        defaultValue={areaName}
                                        disabled
                                        required />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>From</Form.Label>
                                        <br />
                                        <DatePicker
                                            name="startDate"
                                            className="form-control"
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>To</Form.Label>
                                        <br />
                                        <DatePicker
                                            name="endDate"
                                            className="form-control mr-auto"
                                            selected={endDate}
                                            onChange={date => setEndDate(date)}
                                            required
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Link to={`/listings/${areaName}`}>
                                    <Button
                                        className="w-100 mt-3"
                                        variant="warning"
                                        type="submit">
                                        Confirm Booking
                                    </Button>
                                </Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Booking;