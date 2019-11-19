import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { ClassSection, ClassTimeLocation } from "api/generated/curriculums"
import { groupSections, PrimaryClassSection } from "utils/classSections"
import { formatTime } from "utils/format"
import CapacityIndicator from "./CapacityIndicator"

const Wrapper = tw.div`
  max-w-full
  overflow-auto
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

type ClassMeetingColumnProps = {
  meetings: ClassTimeLocation[]
}

const ClassMeetingColumns: React.FC<ClassMeetingColumnProps> = props => {
  const { meetings } = props

  if (meetings.length === 0) {
    return <TableCell colSpan={3}>No meeting information</TableCell>
  }

  return (
    <>
      <TableCell>
        <FlexStack>
          {meetings.map((m, i) => (
            <span key={i}>{m.days}</span>
          ))}
        </FlexStack>
      </TableCell>
      <TableCell>
        <FlexStack>
          {meetings.map((m, i) => (
            <span key={i}>
              {m.beginTime && formatTime(m.beginTime)} -{" "}
              {m.endTime && formatTime(m.endTime)}
            </span>
          ))}
        </FlexStack>
      </TableCell>
      <TableCell>
        <FlexStack>
          {meetings.map((m, i) => (
            <span key={i}>
              {m.building} {m.room}
            </span>
          ))}
        </FlexStack>
      </TableCell>
    </>
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
      <ClassMeetingColumns meetings={section.timeLocations || []} />
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
