import React, { Suspense, useMemo, useState } from "react"
import tw from "tailwind.macro"

import { SearchResource, SearchResourceOptions } from "resources/curriculums"
import CourseSelect from "./components/CourseSelect"
import QuarterSelect from "./components/QuarterSelect"
import ClassDetails from "./components/ClassDetails"
import ResultsSummary from "./components/ResultsSummary"
import ResultsPlaceholder from "./components/ResultsPlaceholder"
import AdvancedSearchOptions from "./components/AdvancedSearchOptions"
import { Class } from "api/generated/curriculums"
import { useObjectInURL, useQuery } from "utils/hooks"

const Title = tw.h1`
  text-xl font-bold text-ucsb-gold
`

const Wrapper = tw.div`
  relative
  mx-auto
  max-w-6xl
`

const ResultsWrapper = tw(Wrapper)`
  -mt-5
`

const FormOuter = tw.div`
  pt-2 pb-8
  border-t-4 border-ucsb-gold
  bg-ucsb-navy
  text-white
`

const FormWrapper = tw.div`
  flex flex-wrap
`

const FormSection = tw.div`
  mt-2
  w-full
`

const QuarterSelectSection = tw(FormSection)`
  lg:w-1/3 lg:pr-4
`

const CourseSelectSection = tw(FormSection)`
  lg:w-2/3
`

type ResultsProps = {
  query: SearchResourceOptions
}

const Results: React.FC<ResultsProps> = React.memo(props => {
  const { query } = props

  if (!query.quarter) {
    return <>Dude</>
  }

  const info: any = SearchResource.read(query)

  return (
    <div>
      <ResultsSummary query={query} results={info} />
      {info.classes &&
        info.classes.map((c: Class) => (
          <ClassDetails key={c.courseId} class={c} />
        ))}
    </div>
  )
})

const Search: React.FC = () => {
  const params = useQuery()
  const [quarter, setQuarter] = useState(params.quarter)
  const [course, setCourse] = useState(params.subjectCode || "")
  const [advancedSearch, setAdvancedSearch] = useState({})

  const query: any = useMemo(
    () => ({
      quarter,
      subjectCode: course,
      ...advancedSearch
    }),
    [quarter, course, advancedSearch]
  )

  for (const key of Object.keys(query)) {
    if (!query[key]) {
      delete query[key]
    }
  }

  useObjectInURL(query)

  return (
    <>
      <FormOuter>
        <Wrapper>
          <Title>UCSB Mapache On-Line Data</Title>
          <FormWrapper>
            <QuarterSelectSection>
              <QuarterSelect value={quarter} onChange={setQuarter} />
            </QuarterSelectSection>
            <CourseSelectSection>
              <CourseSelect value={course} onChange={setCourse} />
            </CourseSelectSection>
            <FormSection>
              <AdvancedSearchOptions onChange={setAdvancedSearch} />
            </FormSection>
          </FormWrapper>
        </Wrapper>
      </FormOuter>
      <ResultsWrapper>
        <Suspense fallback={<ResultsPlaceholder />}>
          <Results query={query} />
        </Suspense>
      </ResultsWrapper>
    </>
  )
}

export default Search
