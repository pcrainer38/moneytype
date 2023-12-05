
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react';


export default function SignUp(props) {
    let [auth, setAuth] = useState('signin');

    const changeAuth = () => {
        setAuth(auth === 'signin' ? 'signup' : 'signin')
    }

    function blurHandler(event) {
        let target = event.target.id;
        let textValue = document.getElementById(target).value;
        if (textValue === '') {
            document.getElementById(target + '-warning').style.display = 'block';
        } else {
            document.getElementById(target + '-warning').style.display = 'none';
        }
        if (target === 'email') {
            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let result = regex.test(textValue);
            console.log(result);
            if (result === true) {
                document.getElementById(target + '-warning').style.display = 'none';
            } else {
                document.getElementById(target + '-warning').style.display = 'block';
            }
        }
    
        if (target === 'password') {
            let pwregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
            let pwresult = pwregex.test(textValue);
            if (pwresult === true);
            document.getElementById('password-warning').style.display = 'none';
        } else {
            document.getElementById('password-warning').style.display = 'block';
        }
    }


    if (auth === 'signin') {
        return (
            <div className='signin col-4 mt-5 text-center mx-auto'>
                <div>
                    <h3>Sign In</h3>

                </div>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={changeAuth}>
                            Sign Up
                        </span>
                    </div>
                    <div id='username'>
                        <InputGroup className="mb-3 justify-content-center">
                            
                            <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            id="username"
                            onBlur={blurHandler}
                            />
                        </InputGroup>
                        <p id="username-warning">Username is required</p>
                    </div>
                    
                    <div className='password'>
                        <InputGroup className="mb-3">
                            
                                <Form.Control
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                                id="password"
                                onBlur={blurHandler}
                                />
                                
                        </InputGroup>
                        <p id="password-warning">Username or password is incorrect. Please, try again.</p>
                    </div>
                    
                    <div>
                    <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                    </div>
            </div>
        )
    }

    return (
        <div>
            <div className='signin col-4 mt-5 text-center mx-auto'>
                <h3>Sign Up</h3>
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={changeAuth}>
                    Sign In
                    </span>
                </div>
                <div id='username'>
                    <InputGroup className="mb-3">
                        
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon3"
                        id="username"
                        onBlur={blurHandler}
                        />
                    </InputGroup>
                </div>
                <p id="username-warning">Username is required</p>
                <div id="email">
                    <InputGroup className="mb-3">
                            
                            <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon4"
                            id="email"
                            onBlur={blurHandler}
                            />
                    </InputGroup>
                </div>
                <p id="email-warning">Email is invalid</p>
                <div id="password">
                    <InputGroup className="mb-3">
                            
                            <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon5"
                            id="password"
                            onBlur={blurHandler}
                            />
                    </InputGroup>
                </div>
                <p id="password-warning">Password must be between 8 and 20 characters and contain only letters and numbers and special characters. No spaces</p>
                <div>
                <button type="submit" className="btn btn-primary">
                Submit
              </button>
                </div>
            </div>
        </div>
    )

}
