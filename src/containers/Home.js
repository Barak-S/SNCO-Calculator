import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
        return (
            <div className="home">
                <Col xs={12} sm={12} md={11} lg={11} className="align-center" style={{padding:20}}>
                    <Card style={{padding: '0rem' }}>
                        <div className="home-img">
                            <h1 style={{ fontWeight: '700', color: "#fff"}}><img style={{height: 45}} src={require('../images/calculator.svg')}></img>Mortgage Loan Calculator</h1>
                        </div>
                        <div style={{padding: '1.5rem'}}>
                            <h5>
                            When you shop for a business loan, interest rates are just one part of the big picture. You also need to consider how much you’re borrowing and how long you’ll need to pay it back. The Mortgage Loan Calculator helps you answer all those questions and more.
                            </h5>
                            <p style={{margin:22}}>
                                <Link to="/calculator">
                                    <Button variant="primary">Get Started</Button>
                                </Link>
                            </p>
                        </div>
                    </Card>
                </Col>
            </div>
        );
}

export default Home;