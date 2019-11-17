import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { ClassSection, ClassTimeLocation } from "api/generated/curriculums"
import { groupSections, PrimaryClassSection } from "utils/classSections"
import CapacityIndicator from "./CapacityIndicator"

const Wrapper = tw.div`
  max-w-full
  overflow-scroll
`

const Table = tw.table`
  table-auto
  w-full
  rounded
  bg-gray-300
`

type TableCellProps = {
  minimize?: boolean
}

const TableCell = styled.td<TableCellProps>`
  ${tw`
    whitespace-no-wrap
    py-2 pl-1
  `};

  ${props => props.minimize && tw`w-px`};
`

const IndentedTableCell = tw(TableCell)`
  pl-10
`

const FlexStack = tw.div`
  flex flex-col
`

type TimeLocationProps = {
  at: ClassTimeLocation
}

const TimeLocation: React.FC<TimeLocationProps> = props => {
  const { at } = props

  return (
    <div>
      {at.days} at {at.beginTime} to {at.endTime} in {at.building} {at.room}
    </div>
  )
}

type SectionRowProps = {
  section: ClassSection
  indent?: boolean
}

const SectionRow: React.FC<SectionRowProps> = props => {
  const { section, indent } = props

  const FirstTableCell = indent ? IndentedTableCell : TableCell

  return (
    <tr>
      <FirstTableCell minimize>
        <CapacityIndicator
          max={section.maxEnroll}
          slotsFilled={section.enrolledTotal}
        />
      </FirstTableCell>
      <TableCell>
        <FlexStack>
          {section.timeLocations &&
            section.timeLocations.map(tl => (
              <TimeLocation key={JSON.stringify(tl)} at={tl} />
            ))}
        </FlexStack>
      </TableCell>
      <TableCell minimize>
        <FlexStack>
          {section.instructors &&
            section.instructors.map(i => (
              <div key={i.instructor}>{i.instructor}</div>
            ))}
        </FlexStack>
      </TableCell>
    </tr>
  )
}

type SectionProps = {
  section: PrimaryClassSection
}

const Section: React.FC<SectionProps> = props => {
  const { section } = props

  return (
    <>
      <SectionRow section={section} />
      {section.secondarySections.map(s => (
        <SectionRow key={s.section} section={s} indent />
      ))}
    </>
  )
}

type SectionTableProps = {
  sections?: ClassSection[]
}

const SectionTable: React.FC<SectionTableProps> = props => {
  const { sections } = props

  const groupedSections = groupSections(sections || [])

  return (
    <Wrapper>
      <Table>
        <tbody>
          {groupedSections.map(s => (
            <Section key={s.section} section={s} />
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}

export default SectionTable
