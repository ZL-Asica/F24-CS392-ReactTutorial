// Parse a time string like "9:00" or "15:20"
const parseTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;  // Returns time in minutes from 00:00
};

// Check if two time intervals overlap
const timeOverlap = (time1, time2) => {
  const [start1, end1] = time1.split('-').map(parseTime);
  const [start2, end2] = time2.split('-').map(parseTime);
  return start1 < end2 && start2 < end1;  // True if times overlap
};

// Check if two course meeting strings have overlapping days
const dayOverlap = (days1, days2) => {
  return days1.split('').some(day => days2.includes(day));  // Checks if any day is common
};

// Extract meeting days and time from a meeting string like "MWF 9:00-9:50"
const extractDaysAndTime = (meetingStr) => {
  if (!meetingStr) return { days: '', time: '' };  // If no meeting string, return empty
  const [days, time] = meetingStr.split(' ');
  return { days, time };
};

// Check if two course are in the same quarter
const quarterOverlap = (course1, course2) => {
  return course1.term === course2.term;  // True if both courses are in the same quarter
};

// Main function to check if two courses conflict
export const hasConflict = (course1, course2) => {
  if (!course1.meets || !course2.meets) return false;  // No conflict if no meeting time
  if (!quarterOverlap(course1, course2)) return false;  // No conflict if not in the same quarter

  const { days: days1, time: time1 } = extractDaysAndTime(course1.meets);
  const { days: days2, time: time2 } = extractDaysAndTime(course2.meets);

  return dayOverlap(days1, days2) && timeOverlap(time1, time2);  // True if both days and times overlap
};
