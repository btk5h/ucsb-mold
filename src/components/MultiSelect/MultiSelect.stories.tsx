import React, { useState, useCallback } from "react"
import tw from "tailwind.macro"

import MultiSelect, { objectSelect } from "components/MultiSelect"

const Wrapper = tw.div`
  p-4
`

export default {
  title: "MultiSelect"
}

export function Basic() {
  const items = {
    First: "Value 1",
    Second: "Value 2",
    Third: "Value 3"
  }

  const [state, setState] = useState<string[]>([])

  return (
    <Wrapper>
      Selected Values: {JSON.stringify(state)}
      <MultiSelect
        label="Custom Multi Select"
        values={state}
        onChange={setState}
        {...objectSelect({ items })}
      />
    </Wrapper>
  )
}

export function WithSorting() {
  const items = {
    First: "Value 1",
    Second: "Value 2",
    Third: "Value 3"
  }

  const [state, setState] = useState<string[]>([])

  const setAndSortState = useCallback(state => {
    setState([...state].sort())
  }, [])

  return (
    <Wrapper>
      Selected Values: {JSON.stringify(state)}
      <MultiSelect
        label="Custom Multi Select"
        values={state}
        onChange={setAndSortState}
        {...objectSelect({ items })}
      />
    </Wrapper>
  )
}
