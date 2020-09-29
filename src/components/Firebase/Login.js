import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import { initFirebase, handleGoogleSignIn, handleFBSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './LoginManager';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const { loggedUser, userState, verifyLink } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedUser;
    const [user, setUser] = userState;
    const [verifyMsg, setVerifyMsg] = verifyLink;

    const [newUser, setNewUser] = useState(true);
    const [pass, setPass] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorFirebase, setErrorFirebase] = useState('');
    const [resetPasswordForm, setResetPasswordForm] = useState(false);
    const [isResetLink, setIsResetLink] = useState(false);

    const [loginUser, setLoginUser] = useState({
        userEmail: '',
        userPassword: ''
    });
    const { userEmail, userPassword } = loginUser;
    const { fName, email, password } = user;
    initFirebase();

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) => {
        setErrorFirebase(res.error);
        setUser(res);
        setLoggedInUser(res);
        if (redirect) history.replace(from);
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFBSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pass === confirmPassword) {
            if (newUser && email && password) {
                createUserWithEmailAndPassword(fName, email, password)
                    .then(res => {
                        handleResponse(res, true);
                        if (res.success) {
                            setVerifyMsg(true)
                        }
                    })
            }
        } else {
            handleError('Password not matched. Try Again')
        }

        if (!newUser && userEmail && userPassword) {
            signInWithEmailAndPassword(userEmail, userPassword)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && userEmail && !userPassword) {
            
            resetPassword(userEmail)
                .then(() => setIsResetLink(true))
        }

    }

    const handleError = (msg, duraction = 5000) => {
        setErrorMessage(msg);
        setInterval(() => {
            setErrorMessage('');
        }, duraction)
    }

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            if (!isFieldValid) {
                handleError('Please enter a valid email.', 5000)
            }
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const hasNumber = /\d{1}/.test(e.target.value);
            setPass(e.target.value);
            isFieldValid = isPasswordValid && hasNumber;
            if (!isFieldValid) {
                handleError('At least 7 character with 1 alphabet', 10000)
            }
        }

        if (e.target.name === 'cPassword') {
            const isPasswordValid = e.target.value.length > 6
            const hasNumber = /\d{1}/.test(e.target.value);
            setConfirmPassword(e.target.value);
            isFieldValid = isPasswordValid && hasNumber;
            if (pass !== confirmPassword) {
                handleError('Password not matched.Try Again', 3000)
            }
        }

        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }

        if (e.target.name === 'userEmail' || e.target.name === 'userPassword') {
            const userInfo = { ...loginUser }
            userInfo[e.target.name] = e.target.value;
            setLoginUser(userInfo);
        }

    }

    return (
        <Container style={{backgroundColor: 'black', color: 'gray'}}>
            <Header />
            <Form className="login-form" onSubmit={handleSubmit}>
                {
                    errorFirebase
                    &&
                    <Form.Group>
                        <Button className="w-100" variant="outline-danger"> {errorFirebase} </Button>
                    </Form.Group>
                }
                {
                    errorMessage !== ''
                    && <Form.Group>
                        <Button className="w-100" variant="outline-danger"> {errorMessage} </Button>
                    </Form.Group>
                }
                {
                    newUser
                        ? <>
                            <h3>Create an account</h3>
                            <Form.Group>
                                <Form.Control onBlur={handleBlur} name="fName" type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control onBlur={handleBlur} name="lName" type="text" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control onBlur={handleBlur} name="email" type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control onBlur={handleBlur} name="password" type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control onBlur={handleBlur} name="cPassword" type="password" placeholder="Confirm Password" />
                            </Form.Group>
                            <Button className="w-100" variant="warning" type="submit">
                                Create an account
                            </Button>
                            <Form.Text className="text-muted text-center">
                                Already have an account? <button onClick={() => setNewUser(!newUser)} style={{ border: 'none', background: 'none', color: 'orange' }}>Login</button>
                            </Form.Text>
                        </>
                        :
                        !resetPasswordForm || isResetLink
                            ?
                            <>
                                {
                                    isResetLink
                                    && <Form.Group>
                                        <Button className="w-100" variant="outline-danger"> Password reset link is sent to your mail. </Button>
                                    </Form.Group>
                                }
                                <h3>Login</h3>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} type="text" name="userEmail" placeholder="Username or Email" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} type="password" name="userPassword" placeholder="Password" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Text className="text-right">
                                            <button onClick={() => setResetPasswordForm(!resetPasswordForm)} className="reset-password-btn">Forgot Password</button>
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>
                                <Button className="w-100" variant="warning" type="submit">
                                    Login
                            </Button>
                                <Form.Text className="text-muted text-center">
                                    Don't have an account? <button onClick={() => setNewUser(!newUser)} style={{ border: 'none', background: 'none', color: 'red' }}>Create an account</button>
                                </Form.Text>
                            </>
                            :
                            <>
                                <h3>Reset Password</h3>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} type="text" name="userEmail" placeholder="Email" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Text className="text-left">
                                            If you remember password, try login
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Text className="text-right">
                                            <button onClick={() => setResetPasswordForm(!resetPasswordForm)} className="reset-password-btn">Login</button>
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>
                                <Button className="w-100" variant="warning" type="submit">
                                    Reset Password
                            </Button>
                                <Form.Text className="text-muted text-center">
                                    Don't have an account? <button onClick={() => setNewUser(!newUser)} style={{ border: 'none', background: 'none', color: 'red' }}>Create an account</button>
                                </Form.Text>
                            </>
                }
            </Form>

            <div className="signin-btn">
                Or <br />
                <Button style={{backgroundColor:'gray'}} onClick={fbSignIn} variant="outline-secondary"> Continue with Facebook</Button> <br />
                <Button style={{backgroundColor:'gray'}} onClick={googleSignIn} variant="outline-secondary"> Continue with Google</Button>
            </div>
        </Container>
    );
};

export default Login;