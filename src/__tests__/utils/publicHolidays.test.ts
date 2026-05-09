import { describe, expect, it } from "vitest";
import {
  getHolidayMapForYear,
  getHolidaysForYear,
} from "../../utils/publicHolidays";

describe("publicHolidays", () => {
  it("should return built-in and patched holidays for a year", () => {
    const holidays = getHolidaysForYear(2026, "en", ["public"]);

    expect(holidays.length).toBeGreaterThan(0);
    expect(holidays.some((holiday) => holiday.date === "2026-05-01")).toBe(
      true,
    );
  });

  it("should localize holiday names", () => {
    const holidays = getHolidaysForYear(2026, "th", ["public"]);
    const labourDay = holidays.find((holiday) => holiday.date === "2026-05-01");

    expect(labourDay?.name).toBe("วันแรงงาน");
  });

  it("should build a date-keyed holiday map", () => {
    const holidayMap = getHolidayMapForYear(2026, "en", ["public"]);

    expect(holidayMap.get("2026-05-01")?.[0]?.name).toBe("Labour Day");
  });
});
