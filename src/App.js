import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';


// const Todo =(props) => {
//     return (
//           <li>
//             {props.item}
//           </li>
//     );
// }

const Todo =({item}) => {   //REMOVE PROPS (DECONSTRUCT)
    return (
      <li>{item.title}
 <input
    type="checkbox"
    id={item.id}
    checked={item.complete} />
 <label htmlFor={item.id}></label>
 <button>
    <i className="fa fa-trash"></i>
 </button>
</li>
    );
}

const ToDoCount =({number}) => {
return(
      <div>
      { number > 1  || number === 0 ? 'todos' : 'todo' }

      </div>
)}


const ClearButton = ({removeCompleted}) => {
  return(
  <button onClick={removeCompleted}>
  Remove
  </button>

)}

class App extends Component {
  render(){
      const todos = [
               { id: 0, title: 'Learn React', complete: false },
               { id: 1, title: 'More React', complete: false }
            ];

      return (

          <div className="todo-list">
          <h1> So Much To Do </h1>
            <ul>
              {todos.map((todo,i)=> <Todo key={i} item={todo}  />)}
            </ul>

            <div className="todo-admin">
            <ToDoCount number= {5} />
            <ClearButton removeCompleted ={"lalala"} />

            </div>


      </div>
  );
} }

Todo.propTypes ={
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired

  })
};

ToDoCount.propTypes ={
  number: PropTypes.number.isRequired

};

ClearButton.propTypes ={
  removeCompleted: PropTypes.string.isRequired

};





export default App;
