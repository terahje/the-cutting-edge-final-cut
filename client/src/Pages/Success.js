import React, { useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Card, Button } from "react-bootstrap";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Link } from "react-router-dom";
import landingImage from "../assets/salon.jpg";




function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      console.log(products);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      
    }

    saveOrder();
  }, [addOrder]);
  
  return (
    <div>
      <Link to="/">
          ← Back to Our Style Gallery
        </Link>

        <div>
     <Jumbotron>   
      <Card className='landingCard'>
        <Card.Img
        variant="top"
        src={landingImage} className='landingImage' alt='salon' 
        />
        <Card.ImgOverlay className='landingOverlay'>
          <Card.Title ><h1 className='landingTitle text-primary'>Success!</h1>
          <h2 className='text-dark '><em>Thank you for your purchase!</em></h2>
          <h2 className='text-dark '><em>Click the link below to submit your order to your stylist. Your new stylist will contact you with your appointment details.</em></h2>
          
          <Button ><a className='btn btn-outline-warning btn-lg' href="mailto:test@test.com">Click to Send to Stylist!</a></Button>
        
          
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
      </Jumbotron>  
     
  

    </div>

   </div>
  );
};

export default Success;