import React from "react";
import useSWR from "swr";
import qs from "qs";
import { Class } from "types/generated/curriculums";
import CourseInfo from "components/CourseInfo";

type CourseQueryResultsProps = {
  query: {
    quarter: string;
    subjectArea: string;
  };
};

const CourseQueryResults: React.FC<CourseQueryResultsProps> = (props) => {
  const { query } = props;
  const { data } = useSWR(
    `/api/curriculums?${qs.stringify(query, { arrayFormat: "repeat" })}`
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.classes.map((c: Class) => (
        <CourseInfo key={c.courseId} class={c} />
      ))}
    </>
  );
};

export default CourseQueryResults;
