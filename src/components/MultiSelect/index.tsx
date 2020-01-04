import React, { useCallback, useMemo, useState, useRef } from "react"
import Downshift, { StateChangeOptions } from "downshift"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { Input as InputBase, Label, Menu } from "components/Input"

const Wrapper = tw.div`
  w-full
  inline-block
  relative
`

const Wall = styled(InputBase).attrs({ as: "div" })`
  ${tw`
    bg-white
    flex
    cursor-text
    flex-wrap
  `};
`

const SelectedValue = tw.span`
  px-2 py-1 mx-1
  rounded
  bg-green-200
  flex-none
`

const Input = tw.input`
  flex-1
  outline-none
`

type RenderPropOptions = {
  isSelected: boolean
  isHighlighted: boolean
}

const DefaultRow = styled.div<RenderPropOptions>`
  ${tw`
    px-4 py-2
  `}
  ${props => props.isHighlighted && tw`bg-green-200`}
  ${props => props.isSelected && tw`font-bold`}
`

function defaultRowRenderer<T>(itemToString: (item: T) => string) {
  return (item: T, props: RenderPropOptions) => (
    <DefaultRow {...props}>{itemToString(item)}</DefaultRow>
  )
}

function emptyString() {
  return ""
}

type MultiSelectProps<T> = {
  label: string
  values: T[]
  items: T[]
  itemToString?: (item: T) => string
  itemToLabelString?: (item: T) => string
  filterPredicate?: (inputValue: string | null, item: T) => boolean
  keyFunction?: (item: T) => string
  children?: (item: T, options: RenderPropOptions) => React.ReactElement
  onChange: (selection: T[]) => void
}

const MultiSelect = <T extends any>(props: MultiSelectProps<T>) => {
  const {
    label,
    values,
    items,
    itemToString = (item: T) => String(item),
    itemToLabelString = itemToString,
    filterPredicate = (inputValue: string | null, item: T) =>
      !inputValue ||
      itemToString(item)
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    keyFunction = itemToString,
    children: renderItem = defaultRowRenderer(itemToString),
    onChange
  } = props

  const [inputValue, setInputValue] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const innerInput = useRef<HTMLInputElement>()

  const handleDownshiftStateChange = useCallback(
    (changes, stateAndHelpers: any) => {
      setHighlightedIndex(stateAndHelpers.highlightedIndex)
    },
    []
  )

  const focusInput = useCallback(() => {
    if (innerInput.current) {
      innerInput.current.focus()
    }
  }, [])

  const stateReducer = useCallback(
    (state: object, changes: StateChangeOptions<T>) => {
      switch (changes.type) {
        case Downshift.stateChangeTypes.keyDownEnter:
        case Downshift.stateChangeTypes.clickItem:
          return {
            ...changes,
            highlightedIndex,
            isOpen: true
          }
      }

      return changes
    },
    [highlightedIndex]
  )

  const onSelection = useCallback(
    (item: T) => {
      if (values.includes(item)) {
        onChange(values.filter(value => value !== item))
      } else {
        onChange([...values, item])
      }

      setInputValue("")
    },
    [values, onChange]
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace" && !inputValue) {
        onChange(values.slice(0, -1))
      }
    },
    [inputValue, onChange, values]
  )

  const filteredItems = useMemo(
    () => items.filter(item => filterPredicate(inputValue, item)),
    [items, filterPredicate, inputValue]
  )

  return (
    <Downshift
      selectedItem={null}
      onChange={onSelection}
      itemToString={emptyString}
      inputValue={inputValue || ""}
      onInputValueChange={setInputValue}
      onStateChange={handleDownshiftStateChange}
      stateReducer={stateReducer}
    >
      {({
        getRootProps,
        getLabelProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        openMenu,
        highlightedIndex
      }) => (
        <Wrapper {...getRootProps()}>
          <Label {...getLabelProps()}>{label}</Label>
          <Wall onClick={focusInput}>
            {values.map(item => (
              <SelectedValue
                key={keyFunction(item)}
                onClick={() => onSelection(item)}
              >
                {itemToLabelString(item)}
              </SelectedValue>
            ))}
            <Input
              ref={innerInput}
              {...(getInputProps({
                onClick: () => {
                  openMenu()
                  setInputValue("")
                },
                onFocus: () => {
                  openMenu()
                  setInputValue("")
                },
                onKeyDown
              }) as any)}
            />
          </Wall>
          <Menu
            {...getMenuProps({
              isHidden: !isOpen || filteredItems.length === 0
            } as any)}
          >
            {isOpen &&
              filteredItems.map((item, index) => (
                <li {...getItemProps({ item, index, key: keyFunction(item) })}>
                  {renderItem(item, {
                    isHighlighted: index === highlightedIndex,
                    isSelected: values.includes(item)
                  })}
                </li>
              ))}
          </Menu>
        </Wrapper>
      )}
    </Downshift>
  )
}

export default MultiSelect

export { objectSelect } from "components/Select"
