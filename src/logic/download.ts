import { unsafeWindow } from '$';

import type { APIRes, TimeTableAPIRow } from '../types';
import { get } from '../utils/get';
import { createCalendar, generateICal } from './calendar';

type Auth = { token: string; id: string };

const getAuth = (): Auth => {
	const session = unsafeWindow.sessionStorage.getItem('myAdel');
	if (!session) {
		throw new Error('No session found');
	}
	const accessToken = JSON.parse(session).accessToken;
	const token = accessToken.accessToken as string;
	const id = accessToken.claims.sub.substring(1) as string;
	return { token, id };
};

export const download = async () => {
	const auth = getAuth();
	const headers = { Authorization: `Bearer ${auth.token}` };

	const semCodeRes = await get<APIRes<{ 'A.STRM': string }>>(
		`https://api.adelaide.edu.au/api/generic-query-structured/v1/?target=/system/TIMETABLE_WIDGET/queryx/${auth.id}&MaxRows=5`,
		{ headers },
	);
	const semCode = semCodeRes.data.query.rows[0]['A.STRM'];
	const timetableRaw = await get<APIRes<TimeTableAPIRow>>(
		`https://api.adelaide.edu.au/api/generic-query-structured/v1/?target=/system/TIMETABLE_LIST/queryx/${auth.id},${semCode}&MaxRows=9999`,
		{ headers },
	);

	const calendar = createCalendar(
		'uofa-timetable',
		timetableRaw.data.query.rows,
	);
	const iCal = generateICal(calendar);

	const downloadLink = document.createElement('a');
	downloadLink.href = iCal;
	downloadLink.download = 'uofa-timetable.ics';
	downloadLink.style.display = 'none';
	downloadLink.click();
};
