import React from 'react'
import {Link} from 'react-router-dom'


const ProjectNameItem = ({project}) => {
    return (
        <tr>

            <td>
                <Link to={`projectname/${project.name_project}`} target="_top">{project.name_project}</Link>
            </td>
        </tr>
    )
}


const ProjectNameList = ({projects}) => {
    return (
        <table>

            <th>
                Project name
            </th>
            {projects.map((project) => <ProjectNameItem project={project} />)}
        </table>
    )
}


export default ProjectNameList