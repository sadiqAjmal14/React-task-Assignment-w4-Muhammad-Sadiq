import moment from "moment-timezone";

export default function getFormattedDateTime(unixTimestamp, timezone) {
    // Convert Unix timestamp to a moment object
    const date = moment.unix(unixTimestamp);

    // Convert the moment object to the specified timezone
    const localTime = date.tz(timezone);

    // Format the date and time
    const formattedDate = localTime.format('DD MMM YYYY'); // e.g., 18 Aug 2024
    const formattedTime = localTime.format('hh:mm A'); // e.g., 02:30 PM
    const dayOfWeek = localTime.format('dddd'); // e.g., Sunday

    return {
        date: formattedDate,
        time: formattedTime,
        day: dayOfWeek
    };
}