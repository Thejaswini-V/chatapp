import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
    const { user } = useContext(AuthContext)
    console.log("User from AuthContext:", user); // Add this console log
    return (
        <ChatContextProvider user={user}>
            <Router>
                <>
                    <NavBar />
                    <div className="content">
                        <Container>
                            <Routes>
                                <Route path="/" element={user ? <Chat /> : <Login />} />
                                <Route path="/register" element={user ? <Chat /> : <Register />} />
                                <Route path="/login" element={user ? <Chat /> : <Login />} />
                            </Routes>
                        </Container>
                    </div>
                </>
            </Router>
        </ChatContextProvider>
    );
}

export default App;
