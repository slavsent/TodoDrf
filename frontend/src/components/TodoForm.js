import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project_name: props.projects[0]?.id, username: props.users[0]?.id, is_active: '1'}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.name_project, this.state.username, this.state.is_active)
        event.preventDefault()
    }

        handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value})
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="text">Text</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                <label for="is_active">Is active</label>
                    <input type="checkbox" className="form-control" name="is_active"
                    checked={this.state.is_active} onChange={(event)=>this.handleInputChange(event)} />
                </div>

                <div className="form-group">
                    <label for="name_project">Name project</label>
                    <select name="name_project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((project)=><option value={project.id}>{project.name_project}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="username">Username</label>
                    <select name="username" className='form-control' onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>
                </div>


                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm