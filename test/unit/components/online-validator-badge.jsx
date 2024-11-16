import React from "react"
import { mount } from "enzyme"
import OnlineValidatorBadge from "core/components/online-validator-badge"
import expect from "expect"
import { render,screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("<OnlineValidatorBadge/>", function () {
  it("should render a validator link and image correctly for the default validator", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "https://smartbear.com/swagger.json"
      }
    }
    render(
     <OnlineValidatorBadge {...props} />
    )
    const wrapper = mount(
      <OnlineValidatorBadge {...props} />
    )

    // Then
    const badgeElement = screen.getByTestId("validator-badge-link")
    expect(badgeElement.getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=https%3A%2F%2Fsmartbear.com%2Fswagger.json"
    )
    // const validatorImage = screen.getByTestId("validator-badge-link-image")
    // expect(validatorImage).toBeInTheDocument()
    expect(wrapper.find("ValidatorImage").length).toEqual(1)  
  }) 

  it("should encode a definition URL correctly", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
    const wrapper = mount(
      <OnlineValidatorBadge {...props} />
    )
    render(
      <OnlineValidatorBadge {...props} />
    )

    // Then
    const badgeElement = screen.getByTestId("validator-badge-link")
    expect(badgeElement.getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(wrapper.find("ValidatorImage").length).toEqual(1)
    expect(wrapper.find("ValidatorImage").props().src).toEqual(
      "https://validator.swagger.io/validator?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
  })

  it("should resolve a definition URL against the browser's location", function () {
    // TODO: mock `window`
    // When

    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
    const wrapper = mount(
      <OnlineValidatorBadge {...props} />
    )
    render(
      <OnlineValidatorBadge {...props} />
    )

    // Then
    const badgeElement = screen.getByTestId("validator-badge-link")
    expect(badgeElement.getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(wrapper.find("ValidatorImage").length).toEqual(1)
    expect(wrapper.find("ValidatorImage").props().src).toEqual(
      "https://validator.swagger.io/validator?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
  })
  // should resolve a definition URL against the browser's location
})