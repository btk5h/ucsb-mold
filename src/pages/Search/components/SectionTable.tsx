import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { ClassSection, ClassTimeLocation } from "api/generated/curriculums"
import { groupSections, PrimaryClassSection } from "utils/classSections"
import { formatTime } from "utils/format"
import CapacityIndicator from "./CapacityIndicator"

const Wrapper = tw.div`
  max-w-full
  rounded
  px-2 pt-2 pb-1
  overflow-auto
  bg-gray-100
`

const Table = tw.table`
  table-auto
  w-full
`

type TableCellProps = {
  minimize?: boolean
}

const TableCell = styled.td<TableCellProps>`
  ${tw`
    whitespace-no-wrap
    p-2
  `};

  ${props => props.minimize && tw`w-px`};
`

const IndentedTableCell = tw(TableCell)`
  pl-10
`

const TableHeader = styled(TableCell).attrs({ as: "th" })`
  ${tw`
    text-left
    pt-1
    `};
`

const NoMeetingInformation = tw(TableCell)`
  text-red-500 italic
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
    return (
      <NoMeetingInformation colSpan={3}>
        No meeting information
      </NoMeetingInformation>
    )
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
        <thead>
          <tr>
            <TableHeader>Space</TableHeader>
            <TableHeader>Days</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Instructors</TableHeader>
          </tr>
        </thead>
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
