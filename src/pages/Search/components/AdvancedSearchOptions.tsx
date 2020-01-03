import React, { useEffect, useState } from "react"
import tw from "tailwind.macro"

import { useQuery } from "utils/hooks"
import CourseLevelSelect from "./advanced/CourseLevelSelect"
import InstructorInput from "./advanced/InstructorInput"

const Label = tw.span`
  font-semibold
`

const OptionsContainer = tw.div`
  flex
`

const Option = tw.div`
  inline-block
  cursor-pointer
  px-2 py-1 mr-2
  rounded
  text-off-black text-sm font-semibold
  bg-ucsb-gold
  shadow
`

const NoSelectableOptions = tw.div`
  inline-block
  cursor-not-allowed
  px-2 py-1 mr-2
  rounded
  text-off-black text-sm font-semibold
  bg-gray-500
  shadow
`

const EntriesContainer = tw.div`
  flex flex-col
`

type SearchOption<T> = {
  name: string
  key: string
  initialValue: T
  component: React.FC<{
    value: T
    onChange: (newValue: T) => void
    onRemove: () => void
  }>
}

type SearchEntry<T> = {
  option: SearchOption<T>
  data: T
}

const OPTIONS: SearchOption<any>[] = [
  {
    name: "Course Level",
    key: "objLevelCode",
    initialValue: "",
    component: CourseLevelSelect
  },
  {
    name: "Instructor",
    key: "instructor",
    initialValue: "",
    component: InstructorInput
  }
]

function computeInitialEntries(query: any) {
  const entries: SearchEntry<any>[] = []

  for (const option of OPTIONS) {
    const data = query[option.key]

    if (data !== undefined) {
      entries.push({ option, data })
    }
  }

  return entries
}

type AdvancedSearchOptionsProps = {
  onChange: (x: any) => void
}

const AdvancedSearchOptions: React.FC<AdvancedSearchOptionsProps> = props => {
  const { onChange } = props

  const query = useQuery()

  const [selectedEntries, setSelectedEntries] = useState<SearchEntry<any>[]>(
    () => computeInitialEntries(query)
  )

  const selectableOptions = OPTIONS.filter(candidate =>
    selectedEntries.every(op => op.option !== candidate)
  ).map(option => (
    <Option
      key={option.key}
      onClick={() =>
        setSelectedEntries(entries => [
          ...entries,
          { option, data: option.initialValue }
        ])
      }
    >
      {option.name}
    </Option>
  ))

  const renderedEntries = selectedEntries.map(selected => {
    const Component = selected.option.component

    return (
      <Component
        value={selected.data}
        onChange={data =>
          setSelectedEntries(entries =>
            entries.map(entry => {
              if (entry.option !== selected.option) {
                return entry
              }

              return { option: selected.option, data }
            })
          )
        }
        onRemove={() =>
          setSelectedEntries(entries =>
            entries.filter(entry => entry.option !== selected.option)
          )
        }
      />
    )
  })

  useEffect(() => {
    const newQuery: any = {}

    for (const entry of selectedEntries) {
      newQuery[entry.option.key] = entry.data
    }

    onChange(newQuery)
  }, [onChange, selectedEntries])

  return (
    <>
      <Label>Advanced Search</Label>
      <OptionsContainer>
        {selectableOptions.length ? (
          selectableOptions
        ) : (
          <NoSelectableOptions>
            All Search Options Selected!
          </NoSelectableOptions>
        )}
      </OptionsContainer>
      <EntriesContainer>{renderedEntries}</EntriesContainer>
    </>
  )
}

export default AdvancedSearchOptions
