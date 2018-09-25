import { createStore, combineReducers } from 'redux';
import itemsReducer from '../reducers/items';
import visibleReducer from '../reducers/visible';

export default () => {
	const store = createStore(
		combineReducers({
			itemsArray: itemsReducer,
			visible: visibleReducer
		})
	);

	return store;
}