import React from "react";
import tw from "twin.macro";
import NavBar from "components/NavBar";
import QuarterComboBox from "components/QuarterComboBox";
import SubjectAreaComboBox from "components/SubjectAreaComboBox";
import { useManagedQuery } from "utils/hooks";

const Container = tw.div`
  relative
  mx-auto
  max-w-6xl
`;

const FormOuter = tw.div`
  pb-8
  bg-ucsb-navy
  text-white
`;

const FormContainer = tw(Container)`
  flex flex-wrap
`;

const ResultsContainer = tw(Container)`
  -mt-5
`;

const FormSection = tw.div`
  mt-2
  w-full
`;

const QuarterSelectSection = tw(FormSection)`
  lg:w-1/3 lg:pr-4
`;

const SubjectAreaSection = tw(FormSection)`
  lg:w-2/3
`;

const Card = tw.div`
  py-2 px-4
  bg-white
  rounded
  shadow
`;

const schema: {
  quarter: string;
  subjectArea: string;
} = {
  quarter: "20202",
  subjectArea: "",
};

const SearchPage: React.FC = () => {
  const [query, useSetter] = useManagedQuery(schema);

  const setQuarter = useSetter("quarter");
  const setSubjectArea = useSetter("subjectArea");

  return (
    <>
      <NavBar />
      <FormOuter>
        <FormContainer>
          <QuarterSelectSection>
            <QuarterComboBox
              value={query.quarter}
              onChange={setQuarter}
              start="20202"
              count={6}
            />
          </QuarterSelectSection>
          <SubjectAreaSection>
            <SubjectAreaComboBox
              value={query.subjectArea}
              onChange={setSubjectArea}
            />
          </SubjectAreaSection>
        </FormContainer>
      </FormOuter>
      <ResultsContainer>
        <Card>
          <pre>{JSON.stringify(query, null, "\t")}</pre>
        </Card>
      </ResultsContainer>
    </>
  );
};

export default SearchPage;
