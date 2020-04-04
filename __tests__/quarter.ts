import {
  adjustQuarter,
  asHumanQuarter,
  asInternalQuarter,
  asQuarterObject,
  QuarterObject,
} from "utils/quarter";

describe("asQuarterObject", () => {
  it("converts internal quarter strings to quarter objects", () => {
    expect(asQuarterObject("20201")).toStrictEqual({ year: 2020, quarter: 1 });
  });

  it("is idempotent for quarter objects", () => {
    const quarter: QuarterObject = {
      year: 2020,
      quarter: 1,
    };

    expect(asQuarterObject(quarter)).toStrictEqual(quarter);
  });

  it("throws when receiving invalid inputs", () => {
    expect(() => {
      asQuarterObject("");
    }).toThrow();
  });
});

describe("asInternalQuarter", () => {
  it("converts quarter objects to internal quarter strings", () => {
    expect(asInternalQuarter({ year: 2020, quarter: 1 })).toBe("20201");
  });

  it("is idempotent for quarter objects", () => {
    expect(asInternalQuarter("20201")).toBe("20201");
  });

  it("throws when receiving invalid inputs", () => {
    expect(() => {
      asInternalQuarter("");
    }).toThrow();
  });
});

describe("asHumanQuarter", () => {
  it("creates human-readable output", () => {
    expect(asHumanQuarter("20194")).toBe("Fall 2019");
    expect(asHumanQuarter("20201")).toBe("Winter 2020");
    expect(asHumanQuarter("20202")).toBe("Spring 2020");
    expect(asHumanQuarter("20203")).toBe("Summer 2020");
  });
});

describe("adjustQuarter", () => {
  it("increments quarters with the same year", () => {
    const quarter: QuarterObject = {
      year: 2020,
      quarter: 1,
    };

    expect(adjustQuarter(quarter, 1)).toStrictEqual({ year: 2020, quarter: 2 });
  });

  it("wraps quarters around when incrementing", () => {
    const quarter: QuarterObject = {
      year: 2020,
      quarter: 4,
    };

    expect(adjustQuarter(quarter, 1)).toStrictEqual({ year: 2021, quarter: 1 });
  });

  it("decrements quarters with the same year", () => {
    const quarter: QuarterObject = {
      year: 2020,
      quarter: 4,
    };

    expect(adjustQuarter(quarter, -1)).toStrictEqual({
      year: 2020,
      quarter: 3,
    });
  });

  it("wraps quarters around when decrementing", () => {
    const quarter: QuarterObject = {
      year: 2020,
      quarter: 1,
    };

    expect(adjustQuarter(quarter, -1)).toStrictEqual({
      year: 2019,
      quarter: 4,
    });
  });
});
