import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_styleS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import styleItem from "../styleItem";
import { QUERY_styleS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

function styleList() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

const { currentCategory } = state;

const { loading, data } = useQuery(QUERY_styleS);

useEffect(() => {
  if(data) {
    dispatch({
      type: UPDATE_styleS,
      styles: data.styles
    });

    data.styles.forEach((style) => {
      idbPromise('styles', 'put', style);
    });
    // add else if to check if `loading` is undefined in `useQuery()` Hook
  } else if (!loading) {
    // since we're offline, get all of the data from the `styles` store
    idbPromise('styles', 'get').then((styles) => {
      // use retrieved data to set global state for offline browsing
      dispatch({
        type: UPDATE_styleS,
        styles: styles
      });
    });
  }
}, [data, loading, dispatch]);

function filterstyles() {
  if (!currentCategory) {
    return state.styles;
  }

  return state.styles.filter(style => style.category._id === currentCategory);
}

  return (
    <div className="my-2">
      <h2>Our Services:</h2>
      {state.styles.length ? (
        <div className="flex-row">
            {filterstyles().map(style => (
                <styleItem
                  key= {style._id}
                  _id={style._id}
                  image={style.image}
                  name={style.name}
                  price={style.price}
                  quantity={style.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any styles yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default styleList;
