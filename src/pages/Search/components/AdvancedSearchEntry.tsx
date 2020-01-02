import React from "react"
import tw from "tailwind.macro"

import { MdDelete } from "react-icons/all"

const Wrapper = tw.div`
  flex items-end
  mt-1
`

const Button = tw.button`
  p-2
  md:ml-2
  text-2xl 
  hover:text-red-500 hover:bg-darken
  rounded
`

type AdvancedSearchEntryProps = {
  onRemove?: () => void
}

const AdvancedSearchEntry: React.FC<AdvancedSearchEntryProps> = props => {
  const { onRemove } = props

  return (
    <Wrapper>
      {props.children}
      <Button onClick={onRemove}>
        <MdDelete />
      </Button>
    </Wrapper>
  )
}

export default AdvancedSearchEntry
