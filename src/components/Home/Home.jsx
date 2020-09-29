import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import './Home.css';

const Home = () => {
    const { loggedUser } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedUser;
    return (
        <div className="home-bg text-white">
            <div className="card-overlay">
                <Container>
                    <Header currentUser={loggedInUser.name || loggedInUser.email}/>
                    <Slider />
                </Container>
            </div>
        </div>
    );
};

export default Home;