export const UPDATE_GOALS = "UPDATE_GOALS";

export const updateGoals = (goal) => {
    return {
        type: UPDATE_GOALS,
        goal,
    };
};