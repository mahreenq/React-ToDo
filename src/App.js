import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';


const Todo =({item, toggleComplete, removeToDo}) => {   //REMOVE PROPS (DECONSTRUCT)
    return (
      <li>{item.title}
          <input
              type="checkbox"
              id={item.id}
              checked={item.complete}
              onChange={toggleComplete}
            />
                  <label htmlFor={item.id}></label>
            <button onClick ={removeToDo}>
              <i className="fa fa-trash"></i>
             </button>
        </li>
    );
}

const ToDoCount =({number}) => {
return(
      <div>
      {number}
      { number > 1  || number === 0 ? 'todos' : 'todo' }

      </div>
)}

const ClearButton = ({removeCompleted, hasCompleted}) => {
  return(
  <button  onClick={removeCompleted}>
  Remove
  </button>
)}

class App extends Component {
  constructor() {
    super();
    this.state ={
      todos: [{ id:0, title: 'Learn React', complete: false }],
      lastId: 0,
      inputValue:''
    };
    this.removeCompleted = this.removeCompleted.bind(this);
    this.hasCompleted = this.hasCompleted.bind(this);
  //  this.addToDo = this.addToDo.bind(this); *bound below
  }

  addTodo = (event) => {
    event.preventDefault();
    const id = this.state.lastId +1;

    if(this.toDoInput.value){
      let todos = this.state.todos.concat({
        id,
        title: this.toDoInput.value,
        complete: false
      })
      this.setState({
        todos,
        lastId :id,
      })
      this.toDoInput.value='';
    }
  }
  toggleComplete(item){
      let todos = this.state.todos.map( (todo) => {
          if (todo.id === item.id) {
            todo.complete = !todo.complete
          }
      return todo
      })
      this.setState({todos}) //todos.todos if key is same as variable name
  }

  removeToDo(item){
    let todos = this.state.todos.filter((todo) => {
      return todo.id !== item.id;
     })
    this.setState({todos})
  }

  removeCompleted() {
     let todos = this.state.todos.filter((todo) => !todo.complete);
     this.setState({ todos });
  }

  hasCompleted(){
    let todos = this.state.todos.filter((todo) => todo.complete);
    if (todos.length > 0){
      return true;
    } else {
      return false;
    }
    this.setState({ todos });
  }

componentDidMount() {
  this.toDoInput.focus();
}
  render(){
      return (
      <div className="todo-list">
          <h1> So Much To Do </h1>

      <div className="add-todo">
          <form name="addTodo" onSubmit={this.addTodo}>
          <input type="text" ref={(input) => (this.toDoInput = input)} />
              <span>(press enter to add)</span>
          </form>
      </div>

            <ul>
              {this.state.todos.map((todo,i)=> (
                <Todo key={i}
                      item={todo}
                      toggleComplete = {this.toggleComplete.bind(this,todo)} //this.toggleComplete is referencing class method
                      removeToDo = {this.removeToDo.bind(this,todo)}
                />))}
            </ul>

            <div className="todo-admin">
            <ToDoCount number= {this.state.todos.length} />
            {this.hasCompleted() ? <ClearButton removeCompleted ={this.removeCompleted}/> :""}

            </div>
      </div>
    );
  }
}



Todo.propTypes ={
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired

};

ToDoCount.propTypes ={
  number: PropTypes.number.isRequired
};

ClearButton.propTypes ={
  removeCompleted: PropTypes.func.isRequired

};





export default App;
