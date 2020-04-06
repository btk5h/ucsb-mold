import { ClassSection } from "types/generated/curriculums";

export type ParsedClassSection = ClassSection & {
  parsedSection: {
    primary: number;
    secondary: number;
  };
};

function toParsedClassSection(classSection: ClassSection): ParsedClassSection {
  return {
    ...classSection,
    parsedSection: {
      primary: Number((classSection.section as string).slice(0, 2)),
      secondary: Number((classSection.section as string).slice(2, 4)),
    },
  };
}

export type PrimaryClassSection = ParsedClassSection & {
  secondarySections: ParsedClassSection[];
};

export function groupSections(
  classSections: ClassSection[]
): PrimaryClassSection[] {
  // TODO: assumes class sections are ordered, may need to fix if API changes
  const parsedClassSections = classSections.map(toParsedClassSection);

  const output: PrimaryClassSection[] = [];

  for (const section of parsedClassSections) {
    if (section.parsedSection.secondary === 0) {
      output.push({ ...section, secondarySections: [] });
    } else {
      output[output.length - 1].secondarySections.push(section);
    }
  }

  return output;
}
