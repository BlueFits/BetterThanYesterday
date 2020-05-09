import USERS from "../../data/dumy-data";
import { ADD_GOAL, UPDATE_GOAL, UDPATE_STEP, ADD_STEP, UPDATE_TASK, SET_USER } from "../actions/user";
import moment from "moment";

//model for dummy data
import Goal from "../../models/goal";
import Step from "../../models/step";
import Task from "../../models/task";

/*const loggedInUser = USERS.filter(user => user.username === "user1" )[0];
const initialState = {
    username: loggedInUser.username,
    goals: loggedInUser.goalsArrayOfObjects,
};
*/
export default function(state = { email: "init", goals: [] }, action) {
    switch (action.type) {
        case SET_USER:
            return {
                _id: action.id,
                email: action.email,
                goals: action.goals,
            }
        case ADD_GOAL:
            //logic to update to database and the state
            const update = {
                ...state, 
                goals: state.goals.concat(new Goal(
                    action.goalId, 
                    action.goal, 
                    [],
                    "On-going", 
                    action.startDate,
                    action.selectedColor,
                    )),                
            };
            return update;
        case UPDATE_GOAL:
            const updateGoalSnapshot = [...state.goals];
            const updateGoalIndex = updateGoalSnapshot.findIndex(goal => goal._id === action.goalId);

            if (action.updateAction === "setCompleted") {
                updateGoalSnapshot[updateGoalIndex] = {...updateGoalSnapshot[updateGoalIndex], status: "completed"};
                return { ...state, goals: updateGoalSnapshot };
            }
            else if (action.updateAction === "renameGoal") {
                updateGoalSnapshot[updateGoalIndex] = {...updateGoalSnapshot[updateGoalIndex], goalName: action.updateValue};
                return {...state, goals: updateGoalSnapshot};
            }

            else if (action.updateAction === "deleteGoal") {
                updateGoalSnapshot.splice(updateGoalIndex, 1);
                return {...state, goals: updateGoalSnapshot};
            }

        case UDPATE_STEP:            
            //Identifiers Problem this mutates the original
            const updateStepGoalsSnapshot = [...state.goals];
            const goalIndex = state.goals.findIndex(goal => goal._id === action.goalId);
            const steps = updateStepGoalsSnapshot[goalIndex].steps;
            const stepIndex = steps.findIndex(step => step._id === action.stepId);
            //Conditions
            if (action.updateAction === "delete") {
                //Remove it only
                steps.splice(stepIndex, 1);
                return { ...state, goals: updateStepGoalsSnapshot};
            } 
            else if ( action.updateAction === "complete" ) {
                steps[stepIndex] = {...steps[stepIndex], isComplete: true};
                return { ...state, goals: updateStepGoalsSnapshot };
            }
        case ADD_STEP: 
            const { stepToAdd, stepToAddId } = action;
            const addStepGoalsSnaphot = [...state.goals];
            const addStepGoalIndex = addStepGoalsSnaphot.findIndex(goal => goal._id === action.goalId);
            addStepGoalsSnaphot[addStepGoalIndex].steps.push(new Step(stepToAddId, stepToAdd, false, []));
            return { ...state, goals: addStepGoalsSnaphot };
        case UPDATE_TASK:
            //Think about opting for a non mutating making use of {{...something, addSomething}}
            const updateTaskSnap = [...state.goals];
            const updateTaskGoalIndex = updateTaskSnap.findIndex(goal => goal._id === action.goalId);
            const updateTaskSelectedGoal = updateTaskSnap[updateTaskGoalIndex];
            const updateTaskStepIndex = updateTaskSelectedGoal.steps.findIndex(step => step._id === action.stepId);
            const updateTaskSelectedStep = updateTaskSelectedGoal.steps[updateTaskStepIndex];
            const taskIndex = updateTaskSelectedStep.tasks.findIndex(task => task.taskDate === action.currentDate);
            if (taskIndex >= 0) {
                //just update
                updateTaskSelectedStep.tasks[taskIndex].tasksList.push(action.task);
                return { ...state, goals: updateTaskSnap };
            } else {
                //create new task
                updateTaskSelectedStep.tasks.push(new Task(action.taskId, action.currentDate, [action.task]));
                return { ...state, goals: updateTaskSnap };
            }
        default:
            return state;
    };
};