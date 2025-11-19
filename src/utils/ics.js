const MS_IN_DAY = 24 * 60 * 60 * 1000;
const SIX_MONTH_DAYS = 180;

const formatNumber = (value) => String(value).padStart(2, "0");

const formatDateLocal = (date) => {
  return (
    date.getFullYear().toString() +
    formatNumber(date.getMonth() + 1) +
    formatNumber(date.getDate()) +
    "T" +
    formatNumber(date.getHours()) +
    formatNumber(date.getMinutes()) +
    formatNumber(date.getSeconds())
  );
};

const formatDateUTC = (date) => {
  return (
    date.getUTCFullYear().toString() +
    formatNumber(date.getUTCMonth() + 1) +
    formatNumber(date.getUTCDate()) +
    "T" +
    formatNumber(date.getUTCHours()) +
    formatNumber(date.getUTCMinutes()) +
    formatNumber(date.getUTCSeconds()) +
    "Z"
  );
};

const escapeText = (value = "") => {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
};

const parseTime = (timeString) => {
  if (!timeString) return null;
  const [hourString, minuteString = "0", secondString = "0"] = timeString
    .split(":")
    .map((part) => part.trim());
  const hours = Number.parseInt(hourString, 10);
  const minutes = Number.parseInt(minuteString, 10);
  const seconds = Number.parseInt(secondString, 10);

  if ([hours, minutes, seconds].some((n) => Number.isNaN(n))) {
    return null;
  }

  return { hours, minutes, seconds };
};

const getFirstOccurrenceDates = (session, referenceDate) => {
  if (
    typeof session?.dayOfWeek !== "number" ||
    !session?.startTime ||
    !session?.endTime
  ) {
    return null;
  }

  const startTime = parseTime(session.startTime);
  const endTime = parseTime(session.endTime);

  if (!startTime || !endTime) {
    return null;
  }

  const startDate = new Date(referenceDate);
  startDate.setHours(0, 0, 0, 0);
  const dayOffset = (session.dayOfWeek - startDate.getDay() + 7) % 7;
  startDate.setDate(startDate.getDate() + dayOffset);
  startDate.setHours(startTime.hours, startTime.minutes, startTime.seconds, 0);

  if (startDate < referenceDate) {
    startDate.setDate(startDate.getDate() + 7);
  }

  const endDate = new Date(startDate);
  endDate.setHours(endTime.hours, endTime.minutes, endTime.seconds, 0);

  if (endDate <= startDate) {
    return null;
  }

  return { startDate, endDate };
};

const buildDescription = (course) => {
  const parts = [];
  if (course?.courseCode) {
    parts.push(`کد درس: ${course.courseCode}`);
  }
  if (course?.group) {
    parts.push(`گروه: ${course.group}`);
  }
  if (course?.presentedBy) {
    parts.push(`استاد: ${course.presentedBy}`);
  }
  if (course?.info) {
    parts.push(course.info);
  }
  if (course?.warning) {
    parts.push(course.warning);
  }
  return parts.join("\n");
};

export const buildRecurringEventsFromSchedule = (
  courses = [],
  referenceDate = new Date(),
  durationDays = SIX_MONTH_DAYS,
) => {
  if (!Array.isArray(courses) || !courses.length) {
    return [];
  }

  const recurrenceEndDate = new Date(referenceDate);
  recurrenceEndDate.setHours(23, 59, 59, 0);
  recurrenceEndDate.setTime(recurrenceEndDate.getTime() + durationDays * MS_IN_DAY);

  const events = [];

  courses.forEach((course) => {
    if (!course?.sessions?.length) return;

    course.sessions.forEach((session, index) => {
      const occurrence = getFirstOccurrenceDates(session, referenceDate);
      if (!occurrence) return;

      events.push({
        uid:
          `${course.id ?? "course"}-${session.dayOfWeek}-${session.startTime}-${index}-${occurrence.startDate.getTime()}`,
        summary: course.courseName || "Course",
        description: buildDescription(course),
        location: course.location || course.locationName || "",
        startDate: occurrence.startDate,
        endDate: occurrence.endDate,
        until: recurrenceEndDate,
      });
    });
  });

  return events;
};

export const generateICS = (events = [], timezone) => {
  if (!Array.isArray(events) || !events.length) {
    return "";
  }

  const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const now = new Date();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//barnomz//Schedule Export//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  events.forEach((event) => {
    lines.push("BEGIN:VEVENT");
    const uid = `${event.uid}@barnomz`;
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${formatDateUTC(now)}`);
    lines.push(`SUMMARY:${escapeText(event.summary || "Course")}`);
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    }
    if (event.location) {
      lines.push(`LOCATION:${escapeText(event.location)}`);
    }
    lines.push(`DTSTART;TZID=${tz}:${formatDateLocal(event.startDate)}`);
    lines.push(`DTEND;TZID=${tz}:${formatDateLocal(event.endDate)}`);
    lines.push(`RRULE:FREQ=WEEKLY;UNTIL=${formatDateUTC(event.until)}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

export const triggerICSDownload = (fileName, icsContent) => {
  if (!icsContent) return;
  const finalFileName = fileName.endsWith(".ics") ? fileName : `${fileName}.ics`;
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = finalFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
