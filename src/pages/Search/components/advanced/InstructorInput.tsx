import React, { useCallback, useState } from "react"
import tw from "tailwind.macro"

import { Input, Label } from "components/Input"

import AdvancedSearchEntry from "../AdvancedSearchEntry"

const Wrapper = tw.div`
  w-full
  inline-block
  relative
`

type InstructorInputProps = {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

const InstructorInput: React.FC<InstructorInputProps> = props => {
  const { value: initialValue, onChange, onRemove } = props

  const [value, setValueInternal] = useState(initialValue)

  const setValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInternal(e.target.value)
  }, [])

  const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }, [])

  const commitChanges = useCallback(() => {
    onChange(value)
  }, [onChange, value])

  return (
    <AdvancedSearchEntry onRemove={onRemove}>
      <Wrapper>
        <Label htmlFor="instructor-input">Instructor</Label>
        <Input
          id="instructor-input"
          value={value}
          onChange={setValue}
          onKeyPress={onKeyPress}
          onBlur={commitChanges}
        />
      </Wrapper>
    </AdvancedSearchEntry>
  )
}

export default InstructorInput
