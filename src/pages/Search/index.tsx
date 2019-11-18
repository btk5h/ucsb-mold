import React, { Suspense, useState, useEffect } from "react"
import tw from "tailwind.macro"
import { useHistory, useLocation } from "react-router-dom"
import qs from "qs"

import { SearchResource, SearchResourceOptions } from "resources/curriculums"
import CourseSelect from "./components/CourseSelect"
import QuarterSelect from "./components/QuarterSelect"
import CourseLevelSelect from "./components/CourseLevelSelect"
import ClassDetails from "./components/ClassDetails"
import { Class } from "api/generated/curriculums"

const Wrapper = tw.div`
  mx-auto
  max-w-6xl
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
          <ClassDetails key={c.courseId} class={c} />
        ))}
    </div>
  )
}

function useQuery() {
  const location = useLocation()
  return qs.parse(location.search, { ignoreQueryPrefix: true })
}

function useObjectInURL(query: any) {
  const history = useHistory()
  const search = qs.stringify(query)

  useEffect(() => {
    history.replace({ search })
  }, [history, search])
}

const Search: React.FC = () => {
  const params = useQuery()
  const [quarter, setQuarter] = useState(params.quarter)
  const [course, setCourse] = useState(params.subjectCode || "ANTH")
  const [courseLevel, setCourseLevel] = useState("")

  const query = {
    quarter,
    subjectCode: course
  }

  if (courseLevel) {
    // @ts-ignore
    query.objLevelCode = courseLevel
  }

  useObjectInURL(query)

  return (
    <Wrapper>
      <FormWrapper>
        <QuarterSelectSection>
          <QuarterSelect value={quarter} onChange={setQuarter} />
        </QuarterSelectSection>
        <CourseSelectSection>
          <CourseSelect value={course} onChange={setCourse} />
        </CourseSelectSection>
        <FormSection>
          <CourseLevelSelect value={courseLevel} onChange={setCourseLevel} />
        </FormSection>
      </FormWrapper>
      <Suspense fallback={<div>Loading</div>}>
        <Results query={query} />
      </Suspense>
    </Wrapper>
  )
}

export default Search
