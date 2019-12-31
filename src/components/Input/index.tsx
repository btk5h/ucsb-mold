import tw from "tailwind.macro"
import styled from "styled-components"

export const Input = tw.input`
  w-full     
  px-4 py-2
  rounded
  shadow
  focus:border-blue-500
  outline-none
  text-black
`
export const Label = tw.label`
  font-semibold
`
type MenuProps = {
  isHidden: boolean
}
export const Menu = styled.ul<MenuProps>`
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
