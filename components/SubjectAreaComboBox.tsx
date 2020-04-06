import React from "react";

import ComboBox, { objectSelect } from "components/ComboBox";
import courses from "data/courses.json";

const comboboxOptions = objectSelect({
  items: {
    "": "All Courses",
    ...courses,
  },
});

type SubjectAreaComboBoxProps = {
  value?: string;
  onChange: (newValue: string) => void;
};

const SubjectAreaComboBox: React.FC<SubjectAreaComboBoxProps> = (props) => {
  const { value, onChange } = props;

  return (
    <ComboBox
      label="Subject Area"
      value={value}
      autoDetectInitialValue
      onChange={onChange}
      {...comboboxOptions}
    />
  );
};

export default SubjectAreaComboBox;
