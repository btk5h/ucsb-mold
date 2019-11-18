import React, { useCallback, useMemo, useState } from "react"
import Downshift, { StateChangeOptions } from "downshift"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { Input, Label } from "components/Input"

const Wrapper = tw.div`
  w-full
  inline-block
  relative
`

type MenuProps = {
  isHidden: boolean
}

const Menu = styled.ul<MenuProps>`
  ${tw`
    w-full
    mt-1
    absolute z-50
    overflow-y-auto
    rounded 
    shadow
    bg-white
    `};
  ${props => props.isHidden && tw`invisible`};
  max-height: 20rem;
`

type RenderPropOptions = {
  isHighlighted: boolean
}

const DefaultRow = styled.div<RenderPropOptions>`
  ${tw`
    py-2
  `}
  ${props => props.isHighlighted && tw`bg-green-200`}
`

function defaultRowRenderer<T>(itemToString: (item: T) => string) {
  return (item: T, { isHighlighted }: RenderPropOptions) => (
    <DefaultRow isHighlighted={isHighlighted}>{itemToString(item)}</DefaultRow>
  )
}

type SelectProps<T> = {
  label: string
  value: T
  items: T[]
  itemToString?: (item: T) => string
  filterPredicate?: (inputValue: string | null, item: T) => boolean
  keyFunction?: (item: T) => string
  children?: (item: T, options: RenderPropOptions) => React.ReactElement
  onChange: (selection: T) => void
}

const Select = <T extends any>(props: SelectProps<T>) => {
  const {
    label,
    value,
    items,
    itemToString = (item: T) => String(item),
    filterPredicate = (inputValue: string | null, item: T) =>
      !inputValue ||
      itemToString(item)
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    keyFunction = itemToString,
    children: renderItem = defaultRowRenderer(itemToString),
    onChange
  } = props

  const [inputValue, setInputValue] = useState(itemToString(value))

  const stateReducer = useCallback(
    (state: object, changes: StateChangeOptions<T>) => {
      switch (changes.type) {
        case Downshift.stateChangeTypes.keyDownEscape:
          return {
            ...changes,
            selectedItem: value,
            inputValue: itemToString(value)
          }
      }

      return changes
    },
    [itemToString, value]
  )

  const filteredItems = useMemo(
    () => items.filter(item => filterPredicate(inputValue, item)),
    [items, filterPredicate, inputValue]
  )

  return (
    <Downshift
      defaultHighlightedIndex={0}
      selectedItem={value}
      onChange={onChange}
      itemToString={itemToString}
      inputValue={inputValue || ""}
      onInputValueChange={setInputValue}
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
          <Input
            {...(getInputProps({
              isOpen: isOpen && !!filteredItems.length,
              onClick: () => {
                openMenu()
                setInputValue("")
              },
              onFocus: () => {
                openMenu()
                setInputValue("")
              }
            }) as any)}
          />
          <Menu
            {...getMenuProps({
              isHidden: !isOpen || filteredItems.length === 0
            } as any)}
          >
            {isOpen &&
              filteredItems.map((item, index) => (
                <li {...getItemProps({ item, index, key: keyFunction(item) })}>
                  {renderItem(item, {
                    isHighlighted: index === highlightedIndex
                  })}
                </li>
              ))}
          </Menu>
        </Wrapper>
      )}
    </Downshift>
  )
}

export default Select
