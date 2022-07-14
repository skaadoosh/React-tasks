import React, { Component } from 'react'
import './NewTodoForm.css'

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { task: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    handleSubmit(evt) {
        evt.preventDefault();
        let todo = {
            task: this.state.task.trim(),
            id: Math.floor(Math.random() * 10)
        }
        this.props.create(todo);
        this.setState({ task: "" })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className='NewTodoForm'>
                {/* <label htmlFor="add">Add a Todo</label> */}
                <input className='input'
                    id="add"
                    placeholder="Add Todo"
                    name="task"
                    value={this.state.task}
                    onChange={this.handleChange}
                    required
                />
                <button className='button'>Add</button>
            </form>
        )
    }
}

export default NewTodoForm