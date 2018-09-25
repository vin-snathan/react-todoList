import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import configureStore from './store/configureStore';
import './App.css';

const store = configureStore();

/*------------

	 APPTODO

-------------*/
class App extends Component {
	render() {
		return (
			<Provider store={store}>
			
				<div className='App-wrapper'>			
					<header>
						<Title title= {'ToDo\'s'} />
						<Subtitle />
					</header>

					<section id='App-form'>
						<FormSubmit />
					</section>

					<section id='App-buttonGroup'>
						<Buttons />
					</section>

					<section id='App-identifier'>
						<ConnectedListIdentifier />
					</section>

					<section id='App-list'>
						<ConnectedList />
					</section>
				
				</div>
			
			</Provider>
		);
	}
}

/*------------

	 HEADER

-------------*/
const Title = (props) => <h1> {props.title} </h1>
const Subtitle = () => <p> {new Date().toDateString()}  </p>

/*------------

	 FORM

-------------*/
const FormSubmit = (props) => {

	const onFormSubmit = (e) => {
		e.preventDefault();
		const itemToAdd = e.target.elements.itemToAdd.value.trim();

		if(itemToAdd && !store.getState().itemsArray.find(item => item.value === itemToAdd)) {
			store.dispatch({type: 'ADD_TODO', value: itemToAdd})
		}
		
		e.target.elements.itemToAdd.value = '';
	}


	return (
		<form onSubmit={onFormSubmit}>
			<input type='text' name='itemToAdd' />
		</form>
	);
}

/*------------

	BUTTONS

-------------*/
const Buttons = (props) => {

	console.log(props); 

	const viewComplete = () => store.dispatch({type: 'VIEW_COMPLETE'});
	const viewIncomplete = () => store.dispatch({type: 'VIEW_INCOMPLETE'});
	const  viewAll = () => store.dispatch({type: 'VIEW_ALL'});
	const clearList = () => store.dispatch({type: 'CLEAR_LIST'});
	
	return (
		<div>
			<button onClick={viewComplete}>Completed</button>
			<button onClick={viewIncomplete}>Incomplete</button>
			<button onClick={viewAll}>All</button>
			<button onClick={clearList} style={{color: 'red'}}>Clear</button>
		</div>
	);
};

/*------------

	 LIST

-------------*/
const List = (props) => (
	<ul>

		{
			props.visible === 'COMPLETE' && props.items.filter(item => item.completed).map((item, idx) => <ListItem key={idx} value={item.value} strike={item.completed} />) 
		}
		
		{
			props.visible === 'ALL' && props.items.map((item, idx) => <ListItem key={idx} value={item.value} strike={item.completed} />)
		}

		{
			props.visible === 'INCOMPLETE' && props.items.filter(item => !item.completed).map((item, idx) => <ListItem key={idx} value={item.value} strike={item.completed} />)
		}
	
	</ul>
);

const ConnectedList = connect(state => ({items: state.itemsArray, visible: state.visible}))(List);

const ListItem = (props) => {

	const listItemClick = () => store.dispatch({type: 'TOGGLE_STATUS', value: props.value});

	const deleteItemClick = () => store.dispatch({type: 'DELETE_TODO', value: props.value});

	return (
		<div>
		{
			props.strike ? 
			<li className='strikethrough' onClick={listItemClick}> {props.value} <button onClick={deleteItemClick} className='li-btn'>x</button></li> : 
			<li onClick={listItemClick}> {props.value} <button onClick={deleteItemClick} className='li-btn'>x</button></li>
		}
		</div>
	);
}

/*------------

	VISIBLE

-------------*/
const ListIdentifier = (props) => (
	<div>
		{props.items.length > 0 && <p>{props.visible}</p>}
	</div>
);

const ConnectedListIdentifier = connect(state => ({items: state.itemsArray, visible: state.visible}))(ListIdentifier);


/*------------

  EXPORT APP

-------------*/
export default App;