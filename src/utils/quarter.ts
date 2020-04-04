type Quarter = 1 | 2 | 3 | 4

export type YearQuarter = {
  year: string
  quarter: Quarter
}

export function parseQuarter(s: string): YearQuarter {
  // TODO validate quarter?
  return {
    year: s.slice(0, 4),
    quarter: Number(s.slice(4, 5)) as Quarter
  }
}

export function quarterToString(q: Quarter): string {
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

export function adjustQuarter(q: YearQuarter, n: number): YearQuarter {
  const yearAdjustment = Math.floor((q.quarter + n - 1) / 4)
  const newQuarter = (mod(q.quarter + n - 1, 4) + 1) as Quarter

  return {
    year: String(Number(q.year) + yearAdjustment),
    quarter: newQuarter
  }
}

export function quarterToEnglish(item: YearQuarter) {
  return `${quarterToString(item.quarter)} ${item.year}`
}

export function formatQuarterString(quarter: string) {
  return quarterToEnglish(parseQuarter(quarter))
}
