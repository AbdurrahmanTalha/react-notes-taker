import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut(auth)
        await navigate('/login')
    }
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Note Taker</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/make">Make Todo</Nav.Link>
                        <Nav.Link as={Link} to="/todo">My Todo</Nav.Link>
                        {
                            user ? <button className="btn btn-primary" onClick={handleSignOut}>Log Out</button> : <Nav.Link as={Link} to="/login" className="btn btn-primary">Login</Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;