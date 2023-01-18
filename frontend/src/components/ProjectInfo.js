import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectInfoItem = ({project}) => {
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


const ProjectInfoList = ({projects}) => {
    let { name_project } = useParams();
    let filtered_items = projects.filter((project) => project.name_project === name_project)

    return (
        <table>
            <th>
                Project name
            </th>
            <th>
                Project link
            </th>
            {filtered_items.map((project) => <ProjectInfoItem project={project} />)}
        </table>
    )
}


export default ProjectInfoList