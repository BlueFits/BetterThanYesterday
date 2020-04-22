export const ADD_GOAL = "ADD_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const UDPATE_STEP = "UPDATE_STEP";
export const ADD_STEP = "ADD_STEP";

//This is what we are sending in a server

export const addGoal = (goal) => {
    return {
        type: ADD_GOAL,
        goal,
    };
};

export const updateGoal = (goalId) => {
    return {
        type: UPDATE_GOAL,
        goalId,
    };
};

export const addStep = (goalId, stepToAdd) => {
    return {
        type: ADD_STEP,
        goalId,
        stepToAdd
    };
};

export const udpateStep = ( goalName, stepId, updateAction) => {
    return {
        type: UDPATE_STEP,
        goalName,
        stepId,
        updateAction,
    };
};