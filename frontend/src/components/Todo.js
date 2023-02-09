import React from 'react'
import {Link} from 'react-router-dom'


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{todo.date_create}</td>
            <td>{todo.date_update}</td>
            <td>{todo.is_active}</td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>ToDo text</th>
                    <th>Project id</th>
                    <th>User id</th>
                    <th>Date create</th>
                    <th>Date update</th>
                    <th>Is active</th>
                    <th></th>
                </tr>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            </table>
             <Link to='/todos/create'>Create</Link>
        </div>

    )
}


export default TodoList