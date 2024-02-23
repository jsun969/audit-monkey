/**
 * Convert 12-hour time to 24-hour time.
 * @param time12h Time as a string in 12-hour format: `h:m TT`
 * @returns Time as a string in 24-hour format: `hh:mm:00`
 */
export function convertTime12to24(time12h: string) {
	const [time, modifierWithDot] = time12h.split(' ');
	const [hours, mins] = time.split(':');

	// Normalize strings like "A.M." or "P.M." to "AM" and "PM"
	const modifier = modifierWithDot.replace('.', '');

	if (hours === '12') {
		return `00:${mins}:00`;
	}
	if (modifier === 'PM') {
		return `${Number(hours) + 12}:${mins}:00`;
	}
	if (Number(hours) < 10) {
		return `0${hours}:${mins}:00`;
	}
	return `${hours}:${mins}:00`;
}
