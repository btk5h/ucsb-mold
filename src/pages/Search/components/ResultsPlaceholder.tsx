import React from "react"
import tw from "tailwind.macro"

const Card = tw.div`
  py-2 px-4
  bg-white
  rounded
  shadow
`

const ResultsPlaceholder: React.FC = () => {
  return (
    <>
      <Card>Loading...</Card>
    </>
  )
}

export default ResultsPlaceholder
