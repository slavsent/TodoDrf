import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name_project: '', link_project: '', username: props.users[0]?.id}
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
        this.props.createProject(this.state.name_project, this.state.link_project, this.state.username)
        event.preventDefault()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = [].slice.call(event.target.selectedOptions).map(el => { return el.value});
        const name = target.name;

        this.setState({ [name]: value})
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="name_project">Name project</label>
                    <input type="text" className="form-control" name="name_project"
                        value={this.state.name_project} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                <label for="link_project">Link project</label>
                       <input type="text" className="form-control" name="link_project"
                        value={this.state.link_project} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="username">Username</label>
                    <select multiple={true} name="username" className='form-control'
                    onChange={(event)=>this.handleInputChange(event)}>
                    {this.props.users.map((user)=><option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm
