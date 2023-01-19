import React from 'react'
import {Link} from 'react-router-dom'


const UserUsernameItem = ({user}) => {
    return (
        <tr>

            <td>
                <Link to={`username/${user.username}`} target="_top">{user.username}</Link>
            </td>
        </tr>
    )
}


const UserUsernameList = ({users}) => {
    return (
        <table>

            <th>
                Username
            </th>
            {users.map((user) => <UserUsernameItem user={user} />)}
        </table>
    )
}


export default UserUsernameList