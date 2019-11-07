import React, { Suspense, useState } from "react"
import tw from "tailwind.macro"

import { SearchResource, SearchResourceOptions } from "resources/curriculums"
import CourseSelect from "./components/CourseSelect"
import ClassDetails from "./components/ClassDetails"
import { Class } from "api/generated/curriculums"

const Wrapper = tw.div`
  mx-auto
  max-w-6xl
`

type ResultsProps = {
  query: SearchResourceOptions
}

const Results: React.FC<ResultsProps> = props => {
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
  const [quarter, setQuarter] = useState("20194")
  const [course, setCourse] = useState("ANTH")

  const query = {
    quarter,
    subjectCode: course
  }

  return (
    <Wrapper>
      <CourseSelect value={course} onChange={setCourse}/>
      <input
        type="text"
        value={quarter}
        onChange={e => setQuarter(e.target.value)}
      />
      <Suspense fallback={<div>Loading</div>}>
        <Results query={query}/>
      </Suspense>
    </Wrapper>
  )
}

export default Search
