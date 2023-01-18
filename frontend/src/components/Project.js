import React from 'react'



const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name_project}
            </td>
            <td>
                {project.link_project}
            </td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Project link
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList