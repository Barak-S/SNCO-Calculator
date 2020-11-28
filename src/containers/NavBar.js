import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';

export default class Navigator extends React.Component{

    render(){

        return(
            <div>
                <Navbar inverse collapseOnSelect expand="lg">
                    <Navbar.Brand href="/loans" style={{color: "#1A7BFF",fontWeight: "700", fontSize: 20}}>MLC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{flex:1}}>
                        <Link to="/loans" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" className="NavLinks" style={{color: "#1A7BFF",fontWeight: "600", fontSize: 17}}>All Loans</Nav.Link>   
                        </Link>
                        <Link to="/Calculator" style={{ textDecoration: 'none' }}>
                            <Nav.Link href="#link" className="NavLinks" style={{color: "#1A7BFF",fontWeight: "600", fontSize: 17}}>Calculator</Nav.Link>   
                        </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
