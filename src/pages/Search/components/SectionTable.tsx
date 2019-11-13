import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import { ClassSection, ClassTimeLocation } from "api/generated/curriculums"
import { groupSections, PrimaryClassSection } from "utils/classSections"
import CapacityIndicator from "./CapacityIndicator"

const Wrapper = tw.table`
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

type TimeLocationProps = {
  at: ClassTimeLocation
}

const TimeLocation: React.FC<TimeLocationProps> = props => {
  const { at } = props

  return (
    <>
      {at.days} at {at.beginTime} to {at.endTime} in {at.building} {at.room}
    </>
  )
}

type SectionProps = {
  section: PrimaryClassSection
}

const Section: React.FC<SectionProps> = props => {
  const { section } = props

  return (
    <>
      <tr>
        <TableCell minimize>
          <CapacityIndicator
            max={section.maxEnroll}
            slotsFilled={section.enrolledTotal}
          />
        </TableCell>
        <TableCell>
          {
            section.timeLocations && section.timeLocations.map(tl => (
              <TimeLocation at={tl}/>
            ))
          }
        </TableCell>
        <TableCell minimize>
          {section.instructors && section.instructors.map(i => i.instructor)}
        </TableCell>
      </tr>
      {
        section.secondarySections.map(s => (
          <tr>
            <IndentedTableCell minimize>
              <CapacityIndicator
                max={s.maxEnroll}
                slotsFilled={s.enrolledTotal}
              />
            </IndentedTableCell>
            <TableCell>
              {
                s.timeLocations && s.timeLocations.map(tl => (
                  <TimeLocation at={tl}/>
                ))
              }
            </TableCell>
            <TableCell minimize>
              {s.instructors && s.instructors.map(i => i.instructor)}
            </TableCell>
          </tr>
        ))
      }
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
      {
        groupedSections.map(s => <Section section={s}/>)
      }
    </Wrapper>
  )
}

export default SectionTable
