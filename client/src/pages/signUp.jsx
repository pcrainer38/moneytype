
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export default function (props) {
    let [auth, setAuth] = useState('signin');

    const changeAuth = () => {
        setAuth(auth === 'signin' ? 'signup' : 'signin')
    }

    if (auth === 'signin') {
        return (
            <div className='signin'>
                <h3>Sign In</h3>
                <div className="text-center">
                    Not registered yet?{" "}
                    <span className="link-primary" onClick={changeAuth}>
                        Sign Up
                    </span>
                </div>
                <div id='username'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2"></InputGroup.Text>
                            <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                            />
                    </InputGroup>
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
            <div className='signin'>
                <h3>Sign Up</h3>
                <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary" onClick={changeAuth}>
                    Sign In
                    </span>
                </div>
                <div id='username'>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"></InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon3"
                        />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon4"></InputGroup.Text>
                            <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon4"
                            />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon5"></InputGroup.Text>
                            <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon5"
                            />
                    </InputGroup>
                </div>
                <div>
                <button type="submit" className="btn btn-primary">
                Submit
              </button>
                </div>
            </div>
        </div>
    )
}
