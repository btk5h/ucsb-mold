import React from "react"
import tw from "tailwind.macro"

import { MdSearch } from "react-icons/all"

const Button = tw.button`
  hidden
  md:inline-block
  fixed bottom-0 right-0
  p-4 mr-5 mb-5
  rounded-full
  bg-ucsb-navy
  text-white text-4xl
  shadow-lg
`

function scrollToTop() {
  window.scrollTo({ top: 0 })
}

const JumpToSearchButton: React.FC = () => {
  return (
    <Button onClick={scrollToTop}>
      <MdSearch />
    </Button>
  )
}

export default JumpToSearchButton
