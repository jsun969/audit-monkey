/**
 * Parse JSON data and convert it to .ics format
 */
import type { ICalCalendar, ICalRepeatingOptions } from 'ical-generator';
import ical, { ICalEventRepeatingFreq } from 'ical-generator';

import type { TimeTableAPIRow } from '../types';
import { convertTime12to24 } from '../utils/convert-time-12-to-24';

function createCalEvent(calendar: ICalCalendar, data: TimeTableAPIRow) {
	const summary = `[${data['D.XLATSHORTNAME']}] ${data['B.SUBJECT']} ${data['B.CATALOG_NBR']} - ${data['B.DESCR']}`;

	const location = `${data['G.DESCR']} / ${data['F.ROOM']} / ${data['F.DESCR']}`;

	const startDateData = data['E.START_DT'];
	const endDateData = data['E.END_DT'];
	const startTimeData = data['START_TIME'];
	const endTimeData = data['END_TIME'];

	const startTime = convertTime12to24(startTimeData);
	const endTime = convertTime12to24(endTimeData);

	const eventStart = new Date(Date.parse(`${startDateData}T${startTime}`));
	const eventEnd = new Date(Date.parse(`${startDateData}T${endTime}`));

	// Use this to calculate repeating times
	const endDate = new Date(Date.parse(endDateData));
	const repeatOptions: ICalRepeatingOptions = {
		freq: ICalEventRepeatingFreq.WEEKLY,
		until: endDate,
	};

	calendar.createEvent({
		summary,
		location,
		start: eventStart,
		end: eventEnd,
		repeating: repeatOptions,
	});
}

export function createCalendar(
	name: string,
	rows: Array<TimeTableAPIRow>,
): ICalCalendar {
	const calendar = ical({ name });
	const tz = 'Australia/Adelaide';
	calendar.timezone(tz);
	calendar.x([{ key: 'X-LIC-LOCATION', value: tz }]);

	rows.forEach((row) => {
		if (row['START_TIME'] === '') {
			console.warn(
				`Skipping event with no start time: ${row['B.SUBJECT']} ${row['B.CATALOG_NBR']} - ${row['B.DESCR']}`,
			);
			return;
		}
		createCalEvent(calendar, row);
	});
	return calendar;
}

export function generateICal(cal: ICalCalendar): string {
	const blobData = new Blob([cal.toString()], { type: 'text/calendar' });
	const blobURL = URL.createObjectURL(blobData);
	return blobURL;
}
