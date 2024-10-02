import {EachProject, ProjectImage} from './styledComponents'

const ProjectItem = props => {
  const {item} = props
  const {name, imageUrl} = item
  return (
    <EachProject>
      <ProjectImage src={imageUrl} alt={name} />
      <p>{name}</p>
    </EachProject>
  )
}

export default ProjectItem
