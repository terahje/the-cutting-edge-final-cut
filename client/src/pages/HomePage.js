import React from 'react';
import { Row, Col } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <h1>Services</h1>
            <Row>
            {services.map(service=>(
                <Col sm={12} md={6} lg={4}>
                    <h3>{service.name}</h3>
                </Col>
            ))}

            </Row>
        </div>
    )
}

export default HomePage
