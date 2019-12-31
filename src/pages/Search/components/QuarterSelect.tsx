import React, { Suspense, useCallback, useEffect, useMemo } from "react"
import { parseJSON, isAfter } from "date-fns"

import Select from "components/Select"
import { CurrentQuarterResource } from "resources/quartercalendar"

type Quarter = 1 | 2 | 3 | 4

type YearQuarter = {
  year: string
  quarter: Quarter
}

function parseQuarter(s: string): YearQuarter {
  // TODO validate quarter?
  return {
    year: s.slice(0, 4),
    quarter: Number(s.slice(4, 5)) as Quarter
  }
}

function quarterToString(q: Quarter): string {
  switch (q) {
    case 1:
      return "Winter"
    case 2:
      return "Spring"
    case 3:
      return "Summer"
    case 4:
      return "Fall"
  }
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

function adjustQuarter(q: YearQuarter, n: number): YearQuarter {
  const yearAdjustment = Math.floor((q.quarter + n - 1) / 4)
  const newQuarter = (mod(q.quarter + n - 1, 4) + 1) as Quarter

  return {
    year: String(Number(q.year) + yearAdjustment),
    quarter: newQuarter
  }
}

function itemToString(item: YearQuarter) {
  return `${quarterToString(item.quarter)} ${item.year}`
}

export function formatQuarterString(quarter: string) {
  return itemToString(parseQuarter(quarter))
}

const QUARTERS = [1, 0, -1, -2, -3, -4]

type QuarterSelectInternalProps = {
  value: YearQuarter | false
  onChange: (newValue: YearQuarter) => void
}

const QuarterSelectInternal: React.FC<QuarterSelectInternalProps> = props => {
  const { value, onChange } = props
  const { quarter, lastDayToAddUnderGrad } = CurrentQuarterResource.read()

  const baseQuarter = useMemo(() => parseQuarter(quarter as string), [quarter])
  const quarters = useMemo(
    () => QUARTERS.map(a => adjustQuarter(baseQuarter, a)),
    [baseQuarter]
  )

  useEffect(() => {
    if (!value) {
      const endDate = parseJSON(lastDayToAddUnderGrad as string)

      // set default date to the current or next quarter if more relevant
      if (isAfter(new Date(), endDate)) {
        onChange(quarters[0])
      } else {
        onChange(quarters[1])
      }
    }
  }, [value, onChange, quarters, lastDayToAddUnderGrad])

  return (
    <Select
      label="Quarter"
      value={value || baseQuarter}
      items={quarters}
      onChange={onChange}
      itemToString={itemToString}
    />
  )
}

type QuarterSelectProps = {
  value?: string
  onChange: (newValue: string) => void
}

const QuarterSelect: React.FC<QuarterSelectProps> = props => {
  const { value, onChange } = props

  const onChangeQuarter = useCallback(
    (q: YearQuarter) => {
      onChange(`${q.year}${q.quarter}`)
    },
    [onChange]
  )

  return (
    <Suspense fallback={<div>Loading</div>}>
      <QuarterSelectInternal
        value={!!value && parseQuarter(value)}
        onChange={onChangeQuarter}
      />
    </Suspense>
  )
}

export default QuarterSelect
