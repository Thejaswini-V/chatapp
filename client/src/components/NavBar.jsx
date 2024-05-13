import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const {user,logoutUser}=useContext(AuthContext)
    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.5rem" }}>
            <Container className="d-flex justify-content-between align-items-center">
                {/* Wrap the h2 element with Link */}
                <Link to="/" className="link-light text-decoration-none">
                    <h2>CONNECT</h2>
                </Link>
                {user&&(<span className="text-warning">Logged in as {user?.name}</span>)}
                <div className="d-flex gap-3">
                    {
                        user && (
                        <>
                          <Link onClick={()=>logoutUser()} to="/login" className="link-light text-decoration-none">
                            <p>Logout</p>
                          </Link>
                        </>)
                    }

                    {
                        (!user)&&(
                            <>
                                <Link to="/login" className="link-light text-decoration-none">
                                    <p>Login</p>
                                </Link>
                                <Link to="/register" className="link-light text-decoration-none">
                                    <p>Register</p>
                                </Link>
                            </>
                        )
                    }
                </div>
            </Container>
        </Navbar>
    );
}

export default NavBar;
