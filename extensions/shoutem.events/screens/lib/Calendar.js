import moment from 'moment';
import CalendarManager from 'react-native-calendar-manager';

export function toMoment(date) {
  return moment(date, 'YYYY-MM-DDThh:mm:ss');
}

export function addToCalendar(event) {
  const fromDate = toMoment(event.startTime);
  const toDate = event.endtime ? toMoment(event.endtime)
                               : fromDate.clone().add(1, 'hours');
  CalendarManager.addEvent({
    name: event.title,
    startTime: fromDate.valueOf(),
    endTime: toDate.valueOf(),
  });
}
