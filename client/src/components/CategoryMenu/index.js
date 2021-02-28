import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_CATEGORIES } from "../../utils/queries";
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CategoryMenu = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const { categories } = state;

	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	useEffect(() => {
		if (categoryData) {
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
			categoryData.categories.forEach((category) => {
				idbPromise("categories", "put", category);
			});
		} else if (!loading) {
			idbPromise("categories", "get").then((categories) => {
				dispatch({
					type: UPDATE_CATEGORIES,
					categories: categories,
				});
			});
		}
	}, [categoryData, loading, dispatch]);

	const handleClick = (id) => {
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<div className='navHeader'>
			{categories.map((item) => (
				<button
					className='btn btn-outline-danger mb-2 ml-1'
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}>
					{item.name}
				</button>
			))}
		</div>
	);
};

export default CategoryMenu;
