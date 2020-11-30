import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <div style={{color: "#1A7BFF", backgroundColor: '#191919'}}>
            <Container style={{paddingTop: 12}}>
                <Row>
                    <Col>
                        <h4 style={{ color: "#1A7BFF", fontWeight: "700", fontSize: 20}}>Mortgage Loan Calculator</h4>
                        <h3 className="list-unstyled">
                        <li style={{ color: "#1A7BFF"}}>New York, NY</li>
                        </h3>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <p>© 2020, <a alt="Barak Saidoff Developer Potfolio" target="_blank" href="https://baraksaidoff.com/" style={{color: "#1A7BFF" }}>Barak Web Development</a></p>
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default Footer;