import React from "react"

import Select, { objectSelect } from "components/Select"

const courseLevels = {
  "": "All Courses",
  U: "Undergraduate - All",
  L: "Undergraduate - Lower Division",
  S: "Undergraduate - Upper Division",
  G: "Graduate"
}

type CourseLevelSelectProps = {
  value: string
  onChange: (value: string) => void
}

const CourseLevelSelect: React.FC<CourseLevelSelectProps> = props => {
  const { value, onChange } = props

  return (
    <Select
      {...objectSelect({ items: courseLevels })}
      label="Course Level"
      value={value}
      onChange={onChange}
    />
  )
}

export default CourseLevelSelect
