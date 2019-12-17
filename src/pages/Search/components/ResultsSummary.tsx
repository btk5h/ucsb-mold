import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"
import { useInView } from "react-intersection-observer"

import { SearchResourceOptions } from "resources/curriculums"
import courses from "data/courses.json"

import { formatQuarterString } from "./QuarterSelect"

type CardProps = {
  sticky: boolean
}

const Card = styled.div<CardProps>`
  ${tw`
    sticky
    flex 
    mt-2 mx-2 py-2 px-4
    bg-white
    rounded
  `};

  ${props => (props.sticky ? tw`shadow-lg` : tw`shadow`)};

  top: 0.25rem;
`

type ResultsSummaryProps = {
  query: SearchResourceOptions
  results: any
}

const ResultsSummary: React.FC<ResultsSummaryProps> = props => {
  const { query, results } = props

  const [ref, inView] = useInView()

  // @ts-ignore
  const subject = courses[query.subjectCode]

  return (
    <>
      <div ref={ref} />
      <Card sticky={!inView}>
        <div>
          {formatQuarterString(query.quarter)} — {subject} ({results.total}{" "}
          results)
        </div>
      </Card>
    </>
  )
}

export default ResultsSummary
