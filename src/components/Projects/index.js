import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'

import {
  HeaderContainer,
  WebsiteLogo,
  ProjectsMainContainer,
  SelectInput,
  ProjectsList,
  LoaderContainer,
  FailureContainer,
  FailureImage,
  RetryButton,
} from './styledComponents'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
}

class Projects extends Component {
  state = {
    projectsList: {},
    selectedId: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {selectedId} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${selectedId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        projects: data.projects.map(Item => ({
          id: Item.id,
          name: Item.name,
          imageUrl: Item.image_url,
        })),
      }
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeOption = event => {
    this.setState({selectedId: event.target.value}, this.getProjectsList)
  }

  onClickingRetry = () => {
    this.getProjectsList()
  }

  renderHeader = () => (
    <HeaderContainer>
      <WebsiteLogo
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
        alt="website logo"
      />
    </HeaderContainer>
  )

  renderOptionsInput = () => {
    const {selectedId} = this.state
    return (
      <SelectInput value={selectedId} onChange={this.onChangeOption}>
        {categoriesList.map(Item => (
          <option key={Item.id} value={Item.id}>
            {Item.displayText}
          </option>
        ))}
      </SelectInput>
    )
  }

  renderProjectsList = () => {
    const {projectsList} = this.state
    const {projects = []} = projectsList

    return (
      <ProjectsList>
        {projects.map(Item => (
          <ProjectItem key={Item.id} item={Item} />
        ))}
      </ProjectsList>
    )
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height={50} width={50} />
    </LoaderContainer>
  )

  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <RetryButton type="button" onClick={this.onClickingRetry}>
        Retry
      </RetryButton>
    </FailureContainer>
  )

  renderUsingSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <ProjectsMainContainer>
          {this.renderOptionsInput()}
          {this.renderUsingSwitch()}
        </ProjectsMainContainer>
      </>
    )
  }
}

export default Projects
