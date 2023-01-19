import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.date_create}
            </td>
            <td>
                {todo.date_update}
            </td>
        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                ToDo text
            </th>
            <th>
                Project id
            </th>
            <th>
                User id
            </th>
            <th>
                Date create
            </th>
            <th>
                Date update
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}


export default TodoList