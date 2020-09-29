import React, { useContext, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../images/Logo.png';
import { handleSignOut } from '../Firebase/LoginManager';

const Header = ({ currentUser }) => {

    const {loggedUser, userState, verifyLink} = useContext(UserContext);
    const [user, setUser] = userState;
    const [loggedInUser, setLoggedInUser] = loggedUser;
    const [verifyMsg, setVerifyMsg] = verifyLink;

    const signOut = () => {
        handleSignOut()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
        })
    }
    return (
        <>
        <Navbar bg="none" expand="lg" variant="dark" className="mb-5">
            <Navbar.Brand className="w-25">
                <Link to='/home'>
                    <img className="logo-bg" src={Logo} alt="Logo" />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="w-100" id="basic-navbar-nav">
                <Nav className="mr-auto">
                        <Link to='/home' className="mr-3 header-links">News</Link>
                        <Link to='/home' className="mr-3 header-links">Destination</Link>
                    {
                        currentUser
                            ? <>
                                <strong style={{ marginTop: '.5rem', color: 'whiteSmoke' }}>{currentUser}</strong>
                                <Link to='/'>
                                    <Button onClick={() => signOut()} className="login-btn font-weight-bold" variant="warning">
                                        Sign Out
                                    </Button>
                                </Link>
                            </>
                            : <Link to='/login'>
                                <Button className="login-btn font-weight-bold" variant="warning">
                                    Login
                                </Button>
                            </Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {
            verifyMsg
            && <Button className="w-100 mb-5" variant="outline-success">A Verification link is sent to your email.Please Confirm! </Button>
        }
        </>
    );
};

export default Header;