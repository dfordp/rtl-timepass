import React from "react"
import userEvent from "@testing-library/user-event"
import Operation from "core/components/operation"
import { render,screen } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("<Operation/>", function(){
  it.skip("blanket tests", async function(){

    let props = {
      operation: {get: ()=>{}},
      getComponent: ()=> "div",
      specSelectors: { security(){} },
      path: "/one",
      method: "get",
      shown: true,
      showOpId: "",
      showOpIdPrefix: "",
      toggleCollapse: jest.fn()
    }

    // let wrapper = shallow(<Operation {...props}/>)
    render(<Operation {...props}/>)
    const user = userEvent.setup()

    expect(screen.getByTestId("opblock")).toBeInTheDocument()
    expect(screen.getByTestId("opblock-summary-method").text()).toEqual("GET")
    expect(screen.getByTestId("opblock-summary-path").text().trim()).toEqual("/one")
    expect(screen.getByTestId("[isOpened]").getAttribute("isOpened")).toEqual(true)

    const opblocksummary = screen.getByTestId("opblock-summary")
    await user.click(opblocksummary)
    expect(props.toggleCollapse).toHaveBeenCalled()
  })
})