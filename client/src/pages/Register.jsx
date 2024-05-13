import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
    const {registerInfo, updateregisterInfo,registerUser,registerError,isRegisterLoading}=useContext(AuthContext)
    return (
        <>
            
            <Form onSubmit={registerUser}>
                <Row style={{ height: "100vh", justifyContent: "center", padding: "15%" }}>
                    <Col xs="5">
                        <Stack gap={3}>
                            <h2 className="text-center">Register</h2> {/* Center the text */}
                            <Form.Control type="text" placeholder="Name" 
                            onChange={(e)=>{
                                updateregisterInfo({...registerInfo,name:e.target.value})
                            }} />
                            <Form.Control type="email" placeholder="Email"
                            onChange={(e)=>{
                                updateregisterInfo({...registerInfo,email:e.target.value})
                            }} />
                            <Form.Control type="password" placeholder="Password"
                            onChange={(e)=>{
                                updateregisterInfo({...registerInfo,password:e.target.value})
                            }} />
                            <Button variant="primary" type="submit" >{isRegisterLoading?"Creating your account":"Register"}</Button>
                            {
                                registerError?.error && (<Alert variant="danger"><p>{registerError?.message}</p></Alert>)
                            }
                            
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Register;