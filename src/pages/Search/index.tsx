import React, {
  Suspense,
  useCallback,
  useState,
  useEffect,
  useMemo
} from "react"
import tw from "tailwind.macro"
import { useHistory, useLocation } from "react-router-dom"
import qs from "qs"

import { SearchResource, SearchResourceOptions } from "resources/curriculums"
import CourseSelect from "./components/CourseSelect"
import QuarterSelect from "./components/QuarterSelect"
import CourseLevelSelect from "./components/CourseLevelSelect"
import ClassDetails from "./components/ClassDetails"
import ResultsSummary from "./components/ResultsSummary"
import ResultsPlaceholder from "./components/ResultsPlaceholder"
import { Class } from "api/generated/curriculums"

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

const FormButton = tw.button`
  w-full
  py-4 mt-3
  rounded
  hover:bg-darken
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
  const [course, setCourse] = useState(params.subjectCode || "")
  const [courseLevel, setCourseLevel] = useState("")

  const [advancedSearch, setAdvancedSearch] = useState(false)

  const toggleAdvancedSearch = useCallback(() => {
    setAdvancedSearch(prevState => !prevState)
  }, [])

  const query: any = useMemo(
    () => ({
      quarter,
      subjectCode: course,
      objLevelCode: courseLevel
    }),
    [quarter, course, courseLevel]
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
            {advancedSearch && (
              <FormSection>
                <CourseLevelSelect
                  value={courseLevel}
                  onChange={setCourseLevel}
                />
              </FormSection>
            )}
            <FormButton onClick={toggleAdvancedSearch}>
              {advancedSearch ? "Hide" : "Show"} Advanced Search
            </FormButton>
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
