import { useContext } from "react";
import {Alert , Button, Form , Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const {
    loginError,
    isLoginLoading,
    loginInfo,
    loginUser,
    updateloginInfo}=useContext(AuthContext)
    return ( 
        <>
        <Form onSubmit={loginUser}>
            <Row style={{height:"100vh",justifyContent:"center",padding:"15%"}}>
                <Col xs="5">
                  <Stack gap={3}>
                    <h2 className="text-center">Login</h2>
                    
                    <Form.Control type="email" placeholder="Email" onChange={(e)=>{updateloginInfo({...loginInfo,email:e.target.value})}}/>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>updateloginInfo({...loginInfo,password:e.target.value})}/>
                    <Button variant="primary" type="submit" >{isLoginLoading?"Getting your account":"Login"}</Button>
                    {
                      loginError?.error && (<Alert variant="danger"><p>{loginError?.message}</p></Alert>)
                    }
                  </Stack>
                </Col>
            </Row>
        </Form>
        </>
     );
}
 
export default Login;
