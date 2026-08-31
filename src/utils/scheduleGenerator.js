import { convertPersianNumberToEnglish } from "@/utils/helpers";

// Converts an "HH:MM" (or "H:MM") time string to minutes since midnight.
// Tolerates Persian/Arabic digits and returns null for unparsable input.
export function timeToMinutes(time) {
  if (!time) return null;
  const clean = convertPersianNumberToEnglish(String(time)).trim();
  const [hourPart, minutePart] = clean.split(":");
  const hour = parseInt(hourPart, 10);
  if (Number.isNaN(hour)) return null;
  const minute = parseInt(minutePart, 10);
  return hour * 60 + (Number.isNaN(minute) ? 0 : minute);
}

// Two sessions overlap when they share a weekday and their time ranges intersect.
export function sessionsOverlap(a, b) {
  if (a.dayOfWeek !== b.dayOfWeek) return false;
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);
  if (aStart === null || aEnd === null || bStart === null || bEnd === null) {
    return false;
  }
  return aStart < bEnd && bStart < aEnd;
}

// Any class session of courseA overlaps any session of courseB.
export function haveTimeConflict(courseA, courseB) {
  const aSessions = courseA.sessions ?? [];
  const bSessions = courseB.sessions ?? [];
  return aSessions.some((sa) => bSessions.some((sb) => sessionsOverlap(sa, sb)));
}

// Two courses whose final exams fall on the same date and time.
export function haveExamConflict(courseA, courseB) {
  return (
    !!courseA.finalExamDate &&
    !!courseB.finalExamDate &&
    !!courseA.finalExamTime &&
    !!courseB.finalExamTime &&
    courseA.finalExamDate === courseB.finalExamDate &&
    courseA.finalExamTime === courseB.finalExamTime
  );
}

export function coursesConflict(courseA, courseB, { checkExam = true } = {}) {
  if (haveTimeConflict(courseA, courseB)) return true;
  if (checkExam && haveExamConflict(courseA, courseB)) return true;
  return false;
}

// Groups a flat list of candidate course-groups into per-course requirements.
// Each requirement gathers every candidate group that shares a courseCode, so
// the generator can pick exactly one group per distinct course.
export function groupCandidates(candidates) {
  const byCode = new Map();
  for (const candidate of candidates) {
    const key = candidate.courseCode;
    if (!byCode.has(key)) {
      byCode.set(key, {
        courseCode: candidate.courseCode,
        courseName: candidate.courseName,
        groups: [],
      });
    }
    byCode.get(key).groups.push(candidate);
  }
  return Array.from(byCode.values());
}

// Backtracking generator: picks exactly one group per requirement and keeps
// only combinations with no time (and optionally exam) conflicts. Prunes as
// soon as a partial selection conflicts, so it never expands the full
// cartesian product. Results are capped by maxResults.
export function generateSchedules(requirements, options = {}) {
  const { checkExam = true, maxResults = 200 } = options;
  const results = [];
  const chosen = [];

  // Fewest-groups-first ordering makes conflicting branches die sooner.
  const reqs = [...requirements].sort(
    (a, b) => a.groups.length - b.groups.length,
  );

  const conflictsWithChosen = (course) =>
    chosen.some((c) => coursesConflict(c, course, { checkExam }));

  const backtrack = (index) => {
    if (results.length >= maxResults) return;
    if (index === reqs.length) {
      results.push([...chosen]);
      return;
    }
    for (const group of reqs[index].groups) {
      if (results.length >= maxResults) return;
      if (conflictsWithChosen(group)) continue;
      chosen.push(group);
      backtrack(index + 1);
      chosen.pop();
    }
  };

  backtrack(0);
  return results;
}
