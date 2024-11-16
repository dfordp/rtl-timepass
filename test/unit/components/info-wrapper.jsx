import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { fromJS } from "immutable"
import InfoContainer from "core/containers/info"

describe("<InfoContainer/>", function () {

  const components = {
    info: () => <span data-testid="mocked-info" className="mocked-info"/>
  }
  const mockedProps = {
    specSelectors: {
      info () {},
      url () {},
      basePath () {},
      host () {},
      externalDocs () {},
    },
    oas3Selectors: {
      selectedServer () {},
    },
    getComponent: c => components[c]
  }

  it("renders Info inside InfoContainer if info is provided", function () {

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.info = function () {return fromJS(["info1", "info2"])}

    // When
    render(<InfoContainer {...props}/>)

    // Then
    const renderedInfo = screen.getByTestId("mocked-info")
    expect(renderedInfo).toBeInTheDocument()
  })

  it("does not render Info inside InfoContainer if no info is provided", function () {

    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.info = function () {return fromJS([])}

    // When
    render(<InfoContainer {...props}/>)

    // Then
    const renderedInfo = screen.queryByTestId("mocked-info")
    expect(renderedInfo).not.toBeInTheDocument()
  })

  it("does not render Info inside InfoContainer if info is undefined", function () {

    // Given
    let props = {...mockedProps}

    // When
    render(<InfoContainer {...props}/>)

    // Then
    const renderedInfo = screen.queryByTestId("mocked-info")
    expect(renderedInfo).not.toBeInTheDocument()
  })
})