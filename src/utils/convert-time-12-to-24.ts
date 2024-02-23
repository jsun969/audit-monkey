/**
 * Convert 12-hour time to 24-hour time.
 * @param time12h Time as a string in 12-hour format: `h:m TT`
 * @returns Time as a string in 24-hour format: `hh:mm:00`
 */
export function convertTime12to24(time12h: string) {
	const [time, modifier] = time12h.split(' ');
	const [hoursStr, minutes] = time.split(':');

	let hours = parseInt(hoursStr, 10);

	if (modifier === 'PM' && hours < 12) {
		hours += 12;
	} else if (modifier === 'AM' && hours === 12) {
		hours = 0;
	}

	return `${hours.toString().padStart(2, '0')}:${minutes}:${'00'}`;
}
