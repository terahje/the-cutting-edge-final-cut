import React, { useEffect } from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const cartOpen = useSelector(state => state.cartOpen);
  
  useEffect(() => {
      if (!cart.length) {
          (async () => {
              const cart = await idbPromise('cart', 'get');
              dispatch({ type: ADD_MULTIPLE_TO_CART, styles: [...cart] });
          })()
      }
  }, [cart.length, dispatch]);

    const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
      
    }

    const calculateTotal = () => {
        let sum = 0;
        cart.forEach(item => {
        sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    const submitCheckout = () => {
        const styleIds = [];
      
        cart.forEach((item) => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            styleIds.push(item._id);
          }
        });

        getCheckout({
            variables: { styles: styleIds }
          });
      }
      const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

      useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);

  if (!cartOpen) {
      return (
        <div className="cart-closed" onClick={toggleCart}>
          <span
            role="img"
            aria-label="trash">🧺</span>
        </div>
      );
    }

  return (
    <div className="cart">
        <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Style Basket</h2>
            {cart.length ? (
                <div>
                {cart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                    Auth.loggedIn() ?
                    <button onClick={submitCheckout}>
                        Checkout
                    </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
                </div>
            ) : (
                <h4>
                <span role="img" aria-label="shocked">
                💇
                </span>
                Your new hair style awaits you! Choose a style and we'll find you a stylist!
                </h4>
            )}
            </div>
        );
};

export default Cart;