import React from 'react'
import { useParams } from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserInfoList = ({users}) => {
    let { username } = useParams();
    let filtered_items = users.filter((user) => user.username === username)

    return (
        <table>
            <th>
                User name
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
            {filtered_items.map((user) => <UserItem user={user} />)}
        </table>
    )
}


export default UserInfoList