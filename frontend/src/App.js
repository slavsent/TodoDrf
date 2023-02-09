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
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'


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
            'todos': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        // localStorage.setItem('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        // const token = localStorage.getItem('token')
        this.setState({ 'token': token }, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', { username: username, password: password })
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})
        }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((todo)=>todo.id !== id)})
        }).catch(error => console.log(error))
    }

    createProject(name_project, link_project, users) {
        const headers = this.get_headers()
        const data = {name_project: name_project, link_project: link_project, users: users}
        axios.post('http://127.0.0.1:8000/api/project/', data, {headers})
            .then(response => {
                let new_project = response.data
                const user_project = this.state.projects.filter((item) => item.id === new_project.users)[0]
                new_project.users = user_project
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    createTodo(text, project_name, username, is_active) {
        const headers = this.get_headers()
        const data_todo = {text: text, is_active: is_active, project: project_name, user: username}
        axios.post('http://127.0.0.1:8000/api/todo/', data_todo, {headers})
            .then(response => {
                let new_todo = response.data_todo
                const user_todo = this.state.users.filter((user) => user.id === new_todo.user)[0]
                const projectname = this.state.projects.filter((project) => project.id === new_todo.project)[0]
                new_todo.user = user_todo
                new_todo.project = projectname
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => {
                this.setState({ users: response.data })
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/', { headers })
            .then(response => {
                this.setState({ projects: response.data })
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/', { headers })
            .then(response => {
                this.setState({ todos: response.data })
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()

    }



    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to="/" >Home</Link></li>
                            <li><Link to="/users" >Users</Link></li>
                            <li><Link to="/projects" >Projects</Link></li>
                            <li><Link to="/todos" >ToDos</Link></li>
                            <li><Link to="/username">Username</Link></li>
                            <li><Link to="/projectname" >Project name</Link></li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button>
                                    : <Link to='/login' >Login</Link>}
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}   deleteProject={(id)=>this.deleteProject(id)} />}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name_project, link_project, username) => this.createProject(name_project, link_project, username)} />} />
                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}  deleteTodo={(id)=>this.deleteTodo(id)} />} />
                        <Route exact path='/todos/create' component={() => <TodoForm users={this.state.users} projects={this.state.projects} createTodo={(text, project_name, username, is_active) => this.createTodo(text, project_name, username, is_active)} />} />
                        <Route exact path='/username' component={() =>
                            <UserUsernameList users={this.state.users} />} />
                        <Route exact path='/username/:username' component={() =>
                            <UserInfoList users={this.state.users} />} />
                        <Route exact path='/projectname' component={() =>
                            <ProjectNameList projects={this.state.projects} />} />
                        <Route exact path='/projectname/:name_project' component={() =>
                            <ProjectInfoList projects={this.state.projects} />} />
                        <Route exact path='/login' component={() =>
                            <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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

