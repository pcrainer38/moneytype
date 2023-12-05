import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const SignUp = () => {
    return (
        <div>
           <div>
           <InputGroup className="mb-3">
                <Form.Control
                placeholder="Username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon1"
                />
                <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            </InputGroup>
           </div>

            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                </Form>

            </div>

            <div>
                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword"
                    aria-describedby="passwordHelpBlock"
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text>
            
            </div>
        </div>

    )

}

export default SignUp;