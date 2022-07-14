import React, { Component } from 'react'

class EditTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { task: this.props.task }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }
    handleSubmit(evt) {
        evt.preventDefault();
        this.props.edit(this.props.id, this.state.task)
        this.setState({ task: "" })
    }
    render() {
        return (
            <li>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="task"
                        value={this.state.task}
                        onChange={this.handleChange}
                    />
                    <button>Edit</button>
                </form>
            </li>
        )
    }
}

export default EditTodoForm