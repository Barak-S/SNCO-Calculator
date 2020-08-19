import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';

export default class Navigator extends React.Component{

    render(){

        return(
            <div>
                <Navbar bg="light" expand="xl" className="main-navigation">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" className="NavLinks" style={{color: "#B98757", fontSize: 17}}>Home</Nav.Link>   
                        </Link>
                        <Link to="/Calculator" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" className="NavLinks" style={{color: "#B98757", fontSize: 17}}>Calculator</Nav.Link>   
                        </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
