export const ADD_GOAL = "ADD_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const UDPATE_STEP = "UPDATE_STEP";
export const ADD_STEP = "ADD_STEP";
export const UPDATE_TASK = "UPDATE_TASK";

//This is what we are sending in a server

export const updateTask = (goalId, stepId, task, currentDate) => {
    return {
        type: UPDATE_TASK,
        goalId,
        stepId,
        task,
        currentDate,
    };
};

export const addGoal = (goal, selectedColor) => {
    return {
        type: ADD_GOAL,
        goal,
        selectedColor,
    };
};

export const updateGoal = (goalId, updateAction, updateValue) => {
    return {
        type: UPDATE_GOAL,
        goalId,
        updateAction,
        updateValue,
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