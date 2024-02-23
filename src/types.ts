export type APIRes<TRow> = {
	data: { query: { numrows: number; rows: Array<TRow> } };
};

export type TimeTableAPIRow = {
	'attr:rownumber': number;
	'A.EMPLID': string;
	'A.STRM': string;
	'C.DESCR': string;
	'B.SUBJECT': string;
	'B.CATALOG_NBR': string;
	'B.DESCR': string;
	'D.XLATSHORTNAME': string;
	'A.CLASS_NBR': number;
	START_TIME: string;
	END_TIME: string;
	DAY: string;
	DATES: string;
	'G.DESCR': string;
	'F.ROOM': string;
	'F.DESCR': string;
	'B.CLASS_TYPE': string;
	'E.START_DT': string;
	'E.END_DT': string;
	LECTURE_SORT: string;
	'B.CRSE_ID': string;
};
