import { mergeHolidays, type Holiday } from "./mergeHolidays";

export type HolidayType = "public" | "bank" | "observance";
export type HolidayLocale = "th" | "en";

export interface PublicHolidayEntry {
  date: string;
  name: string;
  nameTH?: string;
  type: HolidayType;
}

export function getHolidaysForYear(
  year: number,
  locale: HolidayLocale = "en",
  types: HolidayType[] = ["public"],
): PublicHolidayEntry[] {
  const merged = mergeHolidays();
  const yearData = merged[String(year)] ?? [];

  return yearData
    .filter((holiday) => types.includes(holiday.type))
    .map((holiday) => ({
      date: holiday.date,
      name: locale === "th" ? holiday.nameTH : holiday.name,
      nameTH: holiday.nameTH,
      type: holiday.type,
    }));
}

export function getHolidayMapForYear(
  year: number,
  locale: HolidayLocale = "en",
  types: HolidayType[] = ["public"],
): Map<string, PublicHolidayEntry[]> {
  const map = new Map<string, PublicHolidayEntry[]>();

  for (const holiday of getHolidaysForYear(year, locale, types)) {
    const existing = map.get(holiday.date) ?? [];
    existing.push(holiday);
    map.set(holiday.date, existing);
  }

  return map;
}

export type { Holiday };
