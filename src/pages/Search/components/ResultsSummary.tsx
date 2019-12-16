import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { SearchResourceOptions } from "resources/curriculums"
import courses from "data/courses.json"

import { formatQuarterString } from "./QuarterSelect"

const Card = styled.div`
  ${tw`
    sticky
    flex 
    mt-2 mx-2 py-2 px-4
    bg-white
    rounded
    shadow-lg
  `};

  top: 0.25rem;
`

type ResultsSummaryProps = {
  query: SearchResourceOptions
  results: any
}

const ResultsSummary: React.FC<ResultsSummaryProps> = props => {
  const { query, results } = props

  // @ts-ignore
  const subject = courses[query.subjectCode]

  return (
    <Card>
      <div>
        {formatQuarterString(query.quarter)} — {subject} (
        {results.classes.length} results)
      </div>
    </Card>
  )
}

export default ResultsSummary
