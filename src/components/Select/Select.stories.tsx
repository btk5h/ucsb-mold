import React, { useState } from "react"
import tw from "tailwind.macro"

import Select, { objectSelect } from "components/Select"

const Wrapper = tw.div`
  p-4
`

export default {
  title: "Select"
}

export function Normal() {
  const [state, setState] = useState("")

  const items = {
    First: "Value 1",
    Second: "Value 2",
    Third: "Value 3"
  }

  return (
    <Wrapper>
      Selected Value: {state}
      <Select
        label="Custom Select"
        value={state}
        autoDetectInitialValue
        onChange={setState}
        {...objectSelect({ items })}
      />
    </Wrapper>
  )
}
