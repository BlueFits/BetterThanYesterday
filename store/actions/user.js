export const ADD_GOAL = "ADD_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const UDPATE_STEP = "UPDATE_STEP";
export const ADD_STEP = "ADD_STEP";
export const UPDATE_TASK = "UPDATE_TASK";
//For Debugging
export const SET_USER = "SET_USER";

export const fetchUser = () => {
    return async dispatch => {
        const response = await fetch("http://192.168.2.16:3000/users/fetch/5eaeef2ccf6f844cd86a8310");
        const user = await response.json();
        dispatch({
            type: SET_USER,
            id: user._id,
            username: user.username,
            goals: user.goals,
        })
    }
};
export const updateTask = (goalId, stepId, task, currentDate) => {
    return {
        type: UPDATE_TASK,
        goalId,
        stepId,
        task,
        currentDate,
    };
};
/* Test Code */
export const addGoal = (userId, goal, selectedColor, startDate) => {
    return async dispatch => {
        //any async code here
        const response = await fetch("http://192.168.2.16:3000/users/goals/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                goal,
                selectedColor,
                startDate,
            }),
        });
        const resData = await response.json();
        dispatch({
            type: ADD_GOAL,
            goalId: resData._id,
            goal,
            selectedColor,
            startDate,
        });
    }
};

export const updateGoal = (goalId, updateAction, updateValue, userId) => {

    return async dispatch => {
        try {
            switch (updateAction) {
                case "deleteGoal":
                    await fetch("http://192.168.2.16:3000/users/goals/delete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                            goalId,
                        }),
                    });
                    dispatch({
                        type: UPDATE_GOAL,
                        goalId,
                        updateAction,
                        updateValue,
                    });
                    break;
                case "setCompleted":
                    await fetch("http://192.168.2.16:3000/users/goals/setAsCompleted", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            goalId,
                            userId,
                        }),
                    });
                    dispatch({
                        type: UPDATE_GOAL,
                        goalId,
                        updateAction,
                        updateValue,
                    });
                    break;
                case "renameGoal":
                    await fetch("http://192.168.2.16:3000/users/goals/renameGoal", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            goalId,
                            updateValue,
                        }),
                    });
                    dispatch({
                        type: UPDATE_GOAL,
                        goalId,
                        updateAction,
                        updateValue,
                    });
                    break;
                default:
                    
            };  
        } catch (err) {
            throw err;
        }
    }
};

export const addStep = (goalId, stepToAdd) => {

    return async dispatch => {
        try {
            const response = await fetch("http://192.168.2.16:3000/users/steps/addStep", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    goalId,
                    stepToAdd
                }),
            });

            const stepToAddId = await response.json();
            dispatch({
                type: ADD_STEP,
                goalId,
                stepToAdd,
                stepToAddId,
            });
        } catch (err) {
            throw err;
        }
    }
};

export const updateStep = ( goalId, stepId, updateAction) => {

    return async dispatch => {
        try {
            switch (updateAction) {
                case "complete":
                    await fetch("http://192.168.2.16:3000/users/steps/setAsCompleted", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            stepId,
                        }),
                    });
                    dispatch({
                        type: UDPATE_STEP,
                        goalId,
                        stepId,
                        updateAction,
                    });
                    break;
                case "delete":
                    await fetch("http://192.168.2.16:3000/users/steps/delete", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            stepId,
                        }),
                    });
                    dispatch({
                        type: UDPATE_STEP,
                        goalId,
                        stepId,
                        updateAction,
                    });
                    break;
                default: 
                    throw new Error("Error in updateStep");
            }
        } catch {

        }
    };
};