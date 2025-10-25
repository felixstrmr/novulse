import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  format,
} from "date-fns";

const DAYS_IN_WEEK = 7;
const WEEKS_IN_MONTH = 4;
const MONTHS_IN_YEAR = 12;

export function formatRelativeTime(date: Date | string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  const minutesDiff = differenceInMinutes(targetDate, now);
  const absoluteMinutes = Math.abs(minutesDiff);

  if (absoluteMinutes < 1) {
    return "now";
  }

  const isFuture = minutesDiff > 0;
  const prefix = isFuture ? "in " : "";
  const suffix = isFuture ? "" : " ago";

  if (absoluteMinutes < 60) {
    return `${prefix}${absoluteMinutes}m${suffix}`;
  }

  const hoursDiff = differenceInHours(targetDate, now);
  const absoluteHours = Math.abs(hoursDiff);
  if (absoluteHours < 24) {
    return `${prefix}${absoluteHours}h${suffix}`;
  }

  const daysDiff = differenceInDays(targetDate, now);
  const absoluteDays = Math.abs(daysDiff);
  if (absoluteDays < DAYS_IN_WEEK) {
    return `${prefix}${absoluteDays}d${suffix}`;
  }

  const weeksDiff = differenceInWeeks(targetDate, now);
  const absoluteWeeks = Math.abs(weeksDiff);
  if (absoluteWeeks < WEEKS_IN_MONTH) {
    return `${prefix}${absoluteWeeks}w${suffix}`;
  }

  const monthsDiff = differenceInMonths(targetDate, now);
  const absoluteMonths = Math.abs(monthsDiff);
  if (absoluteMonths < MONTHS_IN_YEAR) {
    return `${prefix}${absoluteMonths}mo${suffix}`;
  }

  const yearsDiff = differenceInYears(targetDate, now);
  const absoluteYears = Math.abs(yearsDiff);
  return `${prefix}${absoluteYears}y${suffix}`;
}

/**
 * Formats a date to ISO date string (YYYY-MM-DD) for consistent comparison
 * @param date - Date object or date string
 * @returns ISO date string in YYYY-MM-DD format
 */
export function formatToIsoDate(date: Date | string): string {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  return format(targetDate, "yyyy-MM-dd");
}
