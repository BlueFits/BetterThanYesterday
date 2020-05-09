export const ADD_GOAL = "ADD_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const UDPATE_STEP = "UPDATE_STEP";
export const ADD_STEP = "ADD_STEP";
export const UPDATE_TASK = "UPDATE_TASK";
//For Debugging
export const SET_USER = "SET_USER";
//Server
import ServerRoot from "../../config/serverConfig";
const Root = ServerRoot.development;

export const fetchUser = (USER_ID) => {
    return async dispatch => {
        try {
            const response = await fetch(Root + "/users/fetch/" + USER_ID);
            if (!response.ok) {
                const errResData = await response.json();
                throw new Error(errResData.error);
            } else {
                const user = await response.json();
                dispatch({
                    type: SET_USER,
                    id: user._id,
                    email: user.email,
                    goals: user.goals,
                })
            }
        } catch (err) {
            throw new err;
        }
    }
};

export const updateTask = (goalId, stepId, task, currentDate) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(Root + "/users/tasks/update", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + getState().authReducer.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stepId,
                    task,
                    currentDate,
                }),
            });

            if (!response.ok) {
                const errResData = response.json();
                throw new Error(errResData.error);
            } else {
                const resData = await response.json();
    
                if (resData.update) {
                    dispatch({
                        type: UPDATE_TASK,
                        goalId,
                        stepId,
                        task,
                        currentDate,
                        taskId: null,
                    });
                } else {
                    dispatch({
                        type: UPDATE_TASK,
                        goalId,
                        stepId,
                        task,
                        currentDate,
                        taskId: resData.newTaskId,
                    });
                }
            }
        } catch (err) {
            throw err;
        }
    };
};
//Route Protected
export const addGoal = (userId, goal, selectedColor, startDate) => {
    try {
        return async (dispatch, getState) => {
            const response = await fetch(Root + "/users/goals/add", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + getState().authReducer.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    goal,
                    selectedColor,
                    startDate,
                }),
            });

            if (!response.ok) {
                const errResData = await response.json();
                throw new Error(errResData.error);
            } else {
                const resData = await response.json();
                dispatch({
                    type: ADD_GOAL,
                    goalId: resData._id,
                    goal,
                    selectedColor,
                    startDate,
                });
            }
        }
    } catch(err) {
        throw err;
    }
};
//Route protected
export const updateGoal = (goalId, updateAction, updateValue, userId) => {
    return async (dispatch, getState) => {
        try {
            switch (updateAction) {
                case "deleteGoal":
                    const deleteResponse = await fetch(Root + "/users/goals/delete", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + getState().authReducer.token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                            goalId,
                        }),
                    });

                    if (!deleteResponse.ok) {
                        const errResData = await deleteResponse.json();
                        throw new Error(errResData.error);
                    } else {
                        dispatch({
                            type: UPDATE_GOAL,
                            goalId,
                            updateAction,
                            updateValue,
                        });
                    }

                    break;
                case "setCompleted":
                    const setCompletedResponse = await fetch(Root + "/users/goals/setAsCompleted", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + getState().authReducer.token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            goalId,
                            userId,
                        }),
                    });

                    if (!setCompletedResponse.ok) {
                        const errResData = await setCompletedResponse.json();
                        throw new Error(errResData.error);
                    } else {
                        dispatch({
                            type: UPDATE_GOAL,
                            goalId,
                            updateAction,
                            updateValue,
                        });
                    }

                    break;
                case "renameGoal":
                    const renameGoalResponse = await fetch(Root + "/users/goals/rename", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + getState().authReducer.token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            goalId,
                            updateValue,
                        }),
                    });

                    if (!renameGoalResponse.ok) {
                        const errResData = await renameGoalResponse.json();
                        throw new Error(errResData.error);
                    } else {
                        dispatch({
                            type: UPDATE_GOAL,
                            goalId,
                            updateAction,
                            updateValue,
                        });
                    }

                    break;
                default:
                    
            };  
        } catch (err) {
            throw err;
        }
    }
};

export const addStep = (goalId, stepToAdd) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(Root + "/users/steps/add", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + getState().authReducer.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    goalId,
                    stepToAdd
                }),
            });

            if (!response.ok) {
                const errResData = await response.json();
                throw new Error(errResData.error);
            } else {
                const stepToAddId = await response.json();
                dispatch({
                    type: ADD_STEP,
                    goalId,
                    stepToAdd,
                    stepToAddId,
                });
            }
        } catch (err) {
            throw err;
        }
    }
};

export const updateStep = ( goalId, stepId, updateAction) => {
    return async (dispatch, getState) => {
        try {
            switch (updateAction) {
                case "complete":
                    const completeRes = await fetch(Root + "/users/steps/setAsCompleted", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + getState().authReducer.token,
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            stepId,
                        }),
                    });

                    if (!completeRes.ok) {
                        const completeResErrData = await completeRes.json();
                        throw new Error(completeResErrData.error);
                    } else {
                        dispatch({
                            type: UDPATE_STEP,
                            goalId,
                            stepId,
                            updateAction,
                        });
                    }
                    break;
                case "delete":
                    const deleteRes = await fetch(Root + "/users/steps/delete", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + getState().authReducer.token,
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            stepId,
                        }),
                    });

                    if (!deleteRes.ok) {
                        const errResData = deleteRes.json();
                        throw new Error(errResData.error);
                    } else {
                        dispatch({
                            type: UDPATE_STEP,
                            goalId,
                            stepId,
                            updateAction,
                        });
                    }
                    break;
                default: 
                    throw new Error("Error in updateStep");
            }
        } catch (err) {
            throw err;
        }
    };
};