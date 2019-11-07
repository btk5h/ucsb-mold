import React, { useState, useMemo, useCallback } from "react"
import Downshift from "downshift"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

const Wrapper = tw.div`
  w-64
  inline-block
  relative
`

const Label = tw.label`
  font-semibold
`

type InputProps = {
  isOpen: boolean
}

const Input = styled.input<InputProps>`
  ${tw`
    w-full     
    px-4 py-2
    rounded
    shadow
    focus:border-blue-500
    outline-none
    `};
`

type MenuProps = {
  isHidden: boolean
}

const Menu = styled.ul<MenuProps>`
  ${tw`
    w-full
    mt-1
    absolute
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

type SelectProps<T> = {
  label: string
  value: T
  items: T[]
  itemToString?: (item: T) => string
  filterPredicate?: (inputValue: string | null, item: T) => boolean
  keyFunction?: (item: T) => string
  children: (item: T, options: RenderPropOptions) => React.ReactElement
  onChange: (selection: any) => void
}

const Select = <T extends any>(props: SelectProps<T>) => {
  const {
    label,
    value,
    items,
    itemToString = (item: T) => String(item),
    filterPredicate = (inputValue: string | null, item: T) =>
      !inputValue || item.toLowerCase().includes(inputValue.toLowerCase()),
    keyFunction = (item: T) => String(item),
    children: renderItem,
    onChange
  } = props

  const [inputValue, setInputValue] = useState(itemToString(value))
  const [focused, setFocused] = useState(false)

  const onFocus = useCallback((openMenu: () => void) => {

  }, [])

  const filteredItems = useMemo(
    () => items.filter(item => filterPredicate(inputValue, item)),
    [items, filterPredicate, inputValue]
  )

  return (
    <Downshift
      selectedItem={value}
      onChange={onChange}
      itemToString={itemToString}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
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
          <Label {...getLabelProps}>{label}</Label>
          <Input
            {...(getInputProps({
              isOpen: isOpen && !!filteredItems.length,
              onFocus: openMenu
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
