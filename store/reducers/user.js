import USERS from "../../data/dumy-data";
import { UPDATE_GOALS } from "../actions/user";

//model for dummy data
import Goal from "../../models/goal";

const loggedInUser = USERS.filter(user => user.username === "user1" )[0];

const initialState = {
    username: loggedInUser.username,
    goals: loggedInUser.goalsArrayOfObjects,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_GOALS:
            //logic to update to database and the state
            const update = {...state, goals: state.goals.concat(new Goal("idFor"+action.goal, action.goal, []))};
            return update;
        default:
            return state;
    };
};