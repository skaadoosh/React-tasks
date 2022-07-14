import React, { Component } from 'react'
import './Todo.css'
import { Dialog, DialogContent } from '@mui/material';
import MediaQuery from 'react-responsive';
import { CSSTransition } from 'react-transition-group';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.todo.task,
            isDone: false,
            isEditing: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleIsEditing = this.toggleIsEditing.bind(this);
        this.toggleIsDone = this.toggleIsDone.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    handleSubmit(evt) {
        evt.preventDefault();
        this.props.update(this.props.todo.id, this.state.task)
        this.setState({ ...this.state, isEditing: false })
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleRemove() {
        this.props.remove(this.props.todo.id);
    }

    toggleIsEditing() {
        this.setState(st => ({ ...st, isEditing: true }))
    }

    toggleIsDone() {
        this.setState(st => ({ ...st, isDone: !st.isDone }))
    }

    handleClose() {
        this.setState(st => ({ ...st, isEditing: false }))
    }

    render() {

        return (
            <div className='Todo'>
                {!this.state.isEditing && (
                    <div className='Todo-task-container'>

                        <div onClick={this.toggleIsDone}
                            className={this.state.isDone ? "Todo-task completed" : "Todo-task"
                            }>
                            {this.props.todo.task}
                        </div>
                        <div className='Todo-buttons'>
                            <button onClick={this.toggleIsEditing}>
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button onClick={this.handleRemove}>
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>)}

                <MediaQuery minWidth={768}>
                    {(matches) =>
                        matches
                            ?
                            <CSSTransition in={this.state.isEditing} timeout={500} classNames='form' unmountOnExit>
                                <form onSubmit={this.handleSubmit} className='Todo-edit-form'>
                                    <input className='input'
                                        name="task"
                                        value={this.state.task}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <button className='button'>Save</button>
                                </form>
                            </CSSTransition>
                            : <Dialog open={this.state.isEditing} onClose={this.handleClose}>
                                <DialogContent>
                                    <form onSubmit={this.handleSubmit} className='Todo-edit-form'>
                                        <input className='input'
                                            name="task"
                                            value={this.state.task}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <button className='button'>Save</button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                    }
                </MediaQuery>

            </div>
        )
    }
}

export default Todo;