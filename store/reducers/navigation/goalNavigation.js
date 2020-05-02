import { SWITCH_TAB } from "../../actions/navigation/goalNavigation";

const initialState = {
    destination: "active",
    header: "ACTIVE GOALS",
    subHeaderOne: "What do you want to become?",
    subHeaderTwo: "Set big goals!",
    goalStatus: "on-going",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SWITCH_TAB:
            const { destination, header, subHeaderOne, subHeaderTwo, goalStatus } = action;
            return {
                destination,
                header,
                subHeaderOne,
                subHeaderTwo,
                goalStatus,
            };
        default: 
            return state;
    }
};