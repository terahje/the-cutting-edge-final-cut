import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Our Services
          </Link>
          <div className="left-single-page row">
            <div className="col-8" style={{ background: 'rgba(219, 219, 219, 0.5)'}}>

          <h2 style={{background: 'grey'}}>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
            style={{maxHeight:'500px'}}
          />
          </div>
            <div className="right-single-page col-4" style={{background: 'darkgrey'}}>
              <h2 style={{color: '#fff', background: '#007bff', padding: '5px 5px 5px 5px'}}>Meet your Stylist!</h2>
              <img
                          src={require("../assets/stylist-image2.jpg")}
                          alt="model with flowers in hair"
                          className= "flowergirl-img"
                      />
              <h2 style={{color: '#fff', background: '#007bff', padding: '5px'}}>Glady's Hair Salon</h2>
              <p>With more than 10 years experience, Glady's Hair Salon has been a staple in the Tucson Community.  
                From braids and locs to cuts and perms.  Book your appointment with us today!</p>

            </div>

        </div>

        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;