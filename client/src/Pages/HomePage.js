import React from 'react';
import { Row, Col } from 'react-bootstrap';
import services from '../services.js';
import Service from '../components/Service';


const HomePage = () => {
    return (
        <div>
            <h1>Services</h1>
            <Row>
            {services.map(service=>(
                <Col sm={12} md={6} lg={4}>
                    <Service service={service} />
                </Col>
            ))}

            </Row>
        </div>
    )
}

export default HomePage
