export const SWITCH_TAB = "SWITCH_TAB";

export const switchTab = ( destination, header, subHeaderOne, subHeaderTwo, goalStatus) => {
    return {
        type: SWITCH_TAB,
        destination,
        header,
        subHeaderOne,
        subHeaderTwo,
        goalStatus,
    };
}