const itemsReducerDefaultState = []; 

export default (state = itemsReducerDefaultState, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return [...state, {value: action.value, completed: false}]
		case 'TOGGLE_STATUS':
			return state.map(item => action.value === item.value ? {...item, completed: !item.completed} : item)
		case 'DELETE_TODO':
			return state.filter(item => action.value !== item.value)
		case 'CLEAR_LIST':
			return []
		case 'ADD_DEFAULT':
			return state.concat(action.value)
		default:
			return state;
	}
}