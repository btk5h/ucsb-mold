import React, { useMemo } from "react";

import ComboBox from "components/ComboBox";
import {
  asHumanQuarter,
  asInternalQuarter,
  InternalQuarter,
  QuarterLike,
  quarterRange,
} from "utils/quarter";

type QuarterComboBoxProps = {
  value: string;
  start: QuarterLike;
  count: number;
  onChange: (newValue: InternalQuarter) => void;
};

const QuarterComboBox: React.FC<QuarterComboBoxProps> = (props) => {
  const { value, start, count, onChange } = props;

  const quarters = useMemo(() => {
    return quarterRange({ start, count }).map(asInternalQuarter);
  }, [start, count]);

  return (
    <ComboBox
      label="Quarter"
      value={value}
      items={quarters}
      onChange={onChange}
      itemToString={asHumanQuarter}
    />
  );
};

export default QuarterComboBox;
