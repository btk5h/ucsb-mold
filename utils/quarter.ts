type QuarterOfYear = 1 | 2 | 3 | 4;

export type InternalQuarter = string;

export type QuarterObject = {
  year: number;
  quarter: QuarterOfYear;
};

export type QuarterLike = InternalQuarter | QuarterObject;

export function asQuarterObject(q: QuarterLike): QuarterObject {
  if (typeof q === "string") {
    if (q.length === 5) {
      return {
        year: Number(q.slice(0, 4)),
        quarter: Number(q.slice(4, 5)) as QuarterOfYear,
      };
    }

    throw "Invalid quarter format";
  }

  return q as QuarterObject;
}

export function asInternalQuarter(q: QuarterLike): InternalQuarter {
  if (typeof q === "string" && q.length === 5) {
    return q;
  }

  const quarter = asQuarterObject(q);
  return `${quarter.year}${quarter.quarter}`;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function adjustQuarter(q: QuarterLike, n: number): QuarterObject {
  const quarter = asQuarterObject(q);

  const yearAdjustment = Math.floor((quarter.quarter + n - 1) / 4);
  const newQuarter = (mod(quarter.quarter + n - 1, 4) + 1) as QuarterOfYear;

  return {
    year: quarter.year + yearAdjustment,
    quarter: newQuarter,
  };
}

export function humanQuarterOfYear(q: QuarterOfYear): string {
  switch (q) {
    case 1:
      return "Winter";
    case 2:
      return "Spring";
    case 3:
      return "Summer";
    case 4:
      return "Fall";
  }
}

export function asHumanQuarter(q: QuarterLike) {
  const quarter = asQuarterObject(q);
  return `${humanQuarterOfYear(quarter.quarter)} ${quarter.year}`;
}

type QuarterRangeOptions<T> = {
  start: QuarterLike;
  step?: number;
  count: number;
};

export function quarterRange<T>(
  options: QuarterRangeOptions<T>
): QuarterObject[] {
  const { start, step = -1, count } = options;

  if (count === 0) {
    return [];
  }

  const startQuarter = asQuarterObject(start);

  const quarters: QuarterObject[] = [startQuarter];

  for (let i = 1; i < count; i++) {
    const lastQuarter = quarters[i - 1];
    quarters.push(adjustQuarter(lastQuarter, step));
  }

  return quarters;
}
