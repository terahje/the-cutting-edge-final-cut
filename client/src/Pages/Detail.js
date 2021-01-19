import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';

import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_STYLES,
} from "../utils/actions";
import { QUERY_STYLES } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { id } = useParams();

  const [currentStyle, setCurrentStyle] = useState({});

  const { loading, data } = useQuery(QUERY_STYLES);

  const { styles, cart } = state;

  useEffect(() => {
    // already in global store
    if (styles.length) {
      setCurrentStyle(styles.find(style => style._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_STYLES,
        styles: data.styles
      });

      data.styles.forEach((style) => {
        idbPromise('styles', 'put', style);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('styles', 'get').then((indexedStyles) => {
        dispatch({
          type: UPDATE_STYLES,
          styles: indexedStyles
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
        style: { ...currentStyle, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentStyle, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentStyle._id
    });

    idbPromise('cart', 'delete', { ...currentStyle });
  };

  return (
    <>
      {currentStyle && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Our Services
          </Link>

          <h2>{currentStyle.name}</h2>

          <p>
            {currentStyle.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentStyle.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentStyle._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentStyle.image}`}
            alt={currentStyle.name}
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