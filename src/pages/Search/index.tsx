import React, { Suspense, useState } from "react"
import tw from "tailwind.macro"

import { SearchResource, SearchResourceOptions } from "resources/curriculums"
import CourseSelect from "./components/CourseSelect"
import QuarterSelect from "./components/QuarterSelect"
import ClassDetails from "./components/ClassDetails"
import { Class } from "api/generated/curriculums"

const Wrapper = tw.div`
  mx-auto
  max-w-6xl
`

const Input = tw.input`
  w-full     
  px-4 py-2
  rounded
  shadow
  focus:border-blue-500
  outline-none
`

const FormWrapper = tw.div`
  flex flex-wrap
`

const FormSection = tw.div`
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

const Results: React.FC<ResultsProps> = props => {
  if (!props.query.quarter) {
    return <>Dude</>
  }

  const info: any = SearchResource.read(props.query)

  return (
    <div>
      {info.classes &&
      info.classes.map((c: Class) => (
        <ClassDetails key={c.courseId} class={c}/>
      ))}
    </div>
  )
}

const Search: React.FC = () => {
  const [quarter, setQuarter] = useState()
  const [course, setCourse] = useState("ANTH")

  const query = {
    quarter,
    subjectCode: course
  }

  return (
    <Wrapper>
      <FormWrapper>
        <QuarterSelectSection>
          <QuarterSelect value={quarter} onChange={setQuarter}/>
        </QuarterSelectSection>
        <CourseSelectSection>
          <CourseSelect value={course} onChange={setCourse}/>
        </CourseSelectSection>
      </FormWrapper>
      <Suspense fallback={<div>Loading</div>}>
        <Results query={query}/>
      </Suspense>
    </Wrapper>
  )
}

export default Search
