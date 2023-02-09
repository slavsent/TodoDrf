import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.name_project}</td>
            <td>{project.link_project}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}



const ProjectList = ({projects, deleteProject}) => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {setSearchTerm(event.target.value)};
    React.useEffect(() => {
        const results = projects.filter(project =>
          project.name_project.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
      }, [searchTerm]);




    return (
        <div>

            <input type="text" placeholder="Search"  value={searchTerm} onChange={handleChange} />

            <table>
                <tr>
                    <th>Project name</th>
                    <th>Project link</th>
                    <th></th>
                </tr>
                {searchResults.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList