import {
    UPDATE_styleS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';

  const initialState = {
    styles: [],
    categories: [],
    currentCategory: '',
    cart: [],
    cartOpen: false
    
  };

export const reducers = (state= initialState, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_styleS`, return a new state object with an updated styles array
        case UPDATE_styleS:
            return {
                ...state,
                styles: [...action.styles],
            };

            // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
            ...state,
            categories: [...action.categories]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.style]
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.styles],
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(style => {
                return style._id !== action._id;
            });
            
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(style => {
                if (action._id === style._id) {
                    style.purchaseQuantity = action.purchaseQuantity;
                }
                return style;
                })
            };

        case CLEAR_CART:
            return {
            ...state,
            cartOpen: false,
            cart: []
            };
        
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};
// Export the reducer
export default reducers;
