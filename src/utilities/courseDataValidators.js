const dayPattern = /^(M|Tu|W|Th|F)+$/;
const timePattern = /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

const parseTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return { hour, minute };
};

const isValidTimeRange = (startTime, endTime) => {
  const { hour: startHour, minute: startMinute } = parseTime(startTime);
  const { hour: endHour, minute: endMinute } = parseTime(endTime);

  if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
    return 'Hours must be between 0 and 23';
  }

  if (startMinute < 0 || startMinute > 59 || endMinute < 0 || endMinute > 59) {
    return 'Minutes must be between 0 and 59';
  }

  if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
    return 'End time must be later than start time';
  }

  return '';
};

export const validateCourseData = (key, value) => {
  switch (key) {
    case 'title':
      return value.length >= 2 ? '' : 'Title must be at least 2 characters long';

    case 'meets':
      if (value.length === 0) return '';

      if (!value.includes(' ')) {
        return 'Invalid input. Use this format: MWF 12:00-13:20';
      }

      if (value.split(' ').length !== 2) {
        return 'Invalid input. Use this format: MWF 12:00-13:20';
      }

      const [days, time] = value.split(' ');

      if (!dayPattern.test(days)) {
        return 'Invalid days. Use M, Tu, W, Th, or F or any combination of them';
      }
      if (!timePattern.test(time)) {
        return 'Invalid time. Use the format HH:MM-HH:MM';
      }

      return isValidTimeRange(...time.split('-'));

    default:
      return '';
  }
};
