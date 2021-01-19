import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_styleS,
} from "../utils/actions";
import { QUERY_styleS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { id } = useParams();

  const [currentstyle, setCurrentstyle] = useState({});

  const { loading, data } = useQuery(QUERY_styleS);

  const { styles, cart } = state;

  useEffect(() => {
    // already in global store
    if (styles.length) {
      setCurrentstyle(styles.find(style => style._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_styleS,
        styles: data.styles
      });

      data.styles.forEach((style) => {
        idbPromise('styles', 'put', style);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('styles', 'get').then((indexedstyles) => {
        dispatch({
          type: UPDATE_styleS,
          styles: indexedstyles
        });
      });
    }
  }, [styles, data, loading, dispatch, id]);

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
        style: { ...currentstyle, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentstyle, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentstyle._id
    });

    idbPromise('cart', 'delete', { ...currentstyle });
  };

  return (
    <>
      {currentstyle && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Our Services
          </Link>

          <h2>{currentstyle.name}</h2>

          <p>
            {currentstyle.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentstyle.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentstyle._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentstyle.image}`}
            alt={currentstyle.name}
          />
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