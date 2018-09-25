export default (state = 'ALL', action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return 'ALL'
		case 'VIEW_COMPLETE':
			return 'COMPLETE'
		case 'VIEW_INCOMPLETE':
			return 'INCOMPLETE'
		case 'VIEW_ALL':
			return 'ALL'
		case 'CLEAR_LIST':
 			return 'LIST CLEARED'
		default:
			return state;
	}
}