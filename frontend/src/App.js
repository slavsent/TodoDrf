import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import UserInfoList from './components/UserInfo.js'
import UserUsernameList from './components/UserUsername.js'
import ProjectNameList from './components/ProjectName.js'
import ProjectInfoList from './components/ProjectInfo.js'
import Menu from './components/Menu.js'
import Footer from './components/footer.js'
import Home from './components/Home.js'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу `{location.pathname}` не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        Promise.all([axios.get('http://127.0.0.1:8000/api/users'), axios.get('http://127.0.0.1:8000/api/project'),
            axios.get('http://127.0.0.1:8000/api/todo')])
            .then(([response1, response2, response3]) => {
                const users = response1.data
                    this.setState(
                    {
                        'users': users
                    }
                    )
                const projects = response2.data
                    this.setState(
                    {
                        'projects': projects
                    }
                    )
                const todos = response3.data
                    this.setState(
                    {
                        'todos': todos
                    }
                    )
            }).catch(error => console.log(error))
    }



    render () {
        return (
            <div className="App">
                    <BrowserRouter>
                        <nav>
                            <ul>
                                <li><Link to="/" target="_top">Home</Link></li>
                                <li><Link to="/users" target="_top">Users</Link></li>
                                <li><Link to="/projects" target="_top">Projects</Link></li>
                                <li><Link to="/todos" target="_top">ToDos</Link></li>
                                <li><Link to="/username" target="_top">Username</Link></li>
                                <li><Link to="/projectname" target="_top">Project name</Link></li>
                            </ul>
                        </nav>

                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                            <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                            <Route exact path='/username' component={() => <UserUsernameList users={this.state.users} />} />
                            <Route exact path='/username/:username' component={() => <UserInfoList users={this.state.users} />} />
                            <Route exact path='/projectname' component={() => <ProjectNameList projects={this.state.projects} />} />
                            <Route exact path='/projectname/:name_project' component={() => <ProjectInfoList projects={this.state.projects} />} />
                            <Redirect from='/user' to='/users' />
                            <Redirect from='/project' to='/projects' />
                            <Redirect from='/todo' to='/todos' />
                            <Route component={NotFound404} />
                        </Switch>

                        <Footer />
                    </BrowserRouter>
            </div>

        )
    }
}

export default App;

