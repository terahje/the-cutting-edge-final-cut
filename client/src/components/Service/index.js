import React from 'react'
import { Card } from 'react-bootstrap';

const Service = ({ service }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/service/${service._id}`}></a>
            <Card.Img src={service.image} variant='top' />
        </Card>
    )
}

export default Service;
