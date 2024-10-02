import styled from 'styled-components'

export const HeaderContainer = styled.div`
  height: 10vh;
  background-color: #cbd5e1;
  padding-top: 10px;
  padding-left: 40px;
`
export const WebsiteLogo = styled.img`
  width: 10%;
`
export const ProjectsMainContainer = styled.div`
  min-height: 90vh;
  background-color: #e6e9ec;
  padding: 20px;
`
export const SelectInput = styled.select`
  width: 30%;
  outline: none;
  padding: 10px;
  border-radius: 7px;
`
export const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`
export const LoaderContainer = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FailureContainer = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FailureImage = styled.img`
  width: 40%;
`
export const RetryButton = styled.button`
  background-color: #328af2;
  color: #ffffff;
  border: none;
  border-radius: 7px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  outline: none;
`
