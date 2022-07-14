import React, { Component } from 'react'
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css'
import { Dialog, DialogContent } from '@mui/material';
import MediaQuery from 'react-responsive';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{
                id: 121,
                task: "Pet Max",
            }],
            isAdding: false,
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleForm = this.toggleForm.bind(this);

    }
    create(newTodo) {
        this.setState(st => {
            return { todos: [...st.todos, newTodo], isAdding: false }
        })
    }
    remove(id) {
        this.setState(st => ({
            ...st,
            todos: this.state.todos.filter(todo => todo.id !== id)
        }))
    }
    update(id, newTask) {
        let newTodos = this.state.todos.map(todo => {
            if (todo.id === id)
                return { ...todo, task: newTask.trim() };
            else
                return todo;
        })
        this.setState(st => ({ ...st, todos: newTodos }))
    }
    toggleForm() {
        this.setState(st => ({ ...st, isAdding: !st.isAdding }))
    }

    render() {
        return (
            <div className='TodoList'>
                <h1>Tasks.js<span>A simple todo app made with React.</span></h1>
                <p>" Click on a task to mark as done "</p>

                <TransitionGroup className='TodoList-container'>

                    {this.state.todos.map(todo =>
                        <CSSTransition
                            key={todo.id}
                            classNames='todo'
                            timeout={500}
                        >
                            <Todo
                                key={todo.id}
                                todo={todo}
                                remove={this.remove}
                                update={this.update}
                            />
                        </CSSTransition>
                    )}
                </TransitionGroup>


                <MediaQuery minWidth={768}>
                    {(matches) =>
                        matches
                            ? <NewTodoForm className='form' create={this.create} />
                            : <button className='Add-btn' onClick={this.toggleForm}>Add</button>
                    }
                </MediaQuery>
                <Dialog open={this.state.isAdding} onClose={this.toggleForm}>
                    <DialogContent>
                        <NewTodoForm create={this.create} />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default TodoList;