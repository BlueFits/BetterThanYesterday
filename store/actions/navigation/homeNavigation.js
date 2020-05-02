export const SWITCH_DATE = "SWITCH_DATE";

export function switchDate(destination, header, header2, currentDate, previousDate) {
    return {
        type: SWITCH_DATE,
        destination,
        header,
        header2,
        currentDate,
        previousDate,
    };
};