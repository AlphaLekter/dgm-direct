import React, {useState} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Form, Button, FloatingLabel, Col, Row, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';

export default function LoginForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log("Invio form riuscito")

        // TODO - Verifica del login dal database
    }
    return (
        <>
            <div className="login-form d-flex align-items-center vh-100">
                <Container fluid="md">
                    <Row className="justify-content-center">
                        <Col>
                            <Form className="bg-white p-4 rounded-4" onSubmit={handleSubmit}>
                                <h2 align="center">Login</h2>
                                <Col>
                                    <Row className="mb-2">
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Username o email">
                                                <Form.Control type="text" id="inputUsername"
                                                              placeholder="Inserire username o email"
                                                              onChange={e => setUsername(e.target.value)}/>
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Row>

                                    <Row className="mb-2">
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Password">
                                                <Form.Control type="password" id="inputPassword"
                                                              placeholder="Inserire password"
                                                              onChange={e => setPassword(e.target.value)}/>
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Row>

                                    <Row>
                                        <Button type="submit" className="mb-2">Entra!</Button>
                                    </Row>
                                </Col>
                                <div>
                                    <p align="center">Non hai ancora un account? <Link to="/signup">Registrati</Link>
                                    </p>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}