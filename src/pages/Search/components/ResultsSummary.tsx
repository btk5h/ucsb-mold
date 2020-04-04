import React, { useEffect, useState } from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"
import { useInView } from "react-intersection-observer"

import { SearchResourceOptions } from "resources/curriculums"
import courses from "data/courses.json"

import { formatQuarterString } from "utils/quarter"

const Sentinel = tw.div`
  absolute top-0
  mt-5
`

type CardProps = {
  sticky: boolean
}

const cardSticky = tw`
  mx-2
  shadow-lg
  bg-ucsb-navy
  text-white
`

const cardNotSticky = tw`
  shadow
`

const Card = styled.div<CardProps>`
  ${tw`
    sticky
    flex 
    py-2 px-4
    bg-white
    rounded
  `};

  ${props => (props.sticky ? cardSticky : cardNotSticky)};
  top: 0.25rem;
  transition: all 200ms ease;
`

type ResultsSummaryProps = {
  query: SearchResourceOptions
  results: any
}

const ResultsSummary: React.FC<ResultsSummaryProps> = props => {
  const { query, results } = props

  const [ref, inView] = useInView()

  // this hack gives useInView time to resolve
  // we use it to prevent transitions from running erroneously on mount
  const [initialRender, setInitialRender] = useState(true)
  useEffect(() => {
    setInitialRender(false)
  }, [])

  // @ts-ignore
  const subject = courses[query.subjectCode]

  return (
    <>
      <Card sticky={!inView && !initialRender}>
        <div>
          {formatQuarterString(query.quarter)} — {subject} ({results.total}{" "}
          results)
        </div>
      </Card>
      <Sentinel ref={ref} />
    </>
  )
}

export default ResultsSummary
