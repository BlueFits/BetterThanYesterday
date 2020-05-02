import { SWITCH_DATE } from "../../actions/navigation/homeNavigation";
import moment from "moment";



const initialState = {
    header: "TODAY",
    header2: "YESTERDAY",
    currentDate: moment().format("MMMM Do YYYY"),
    previousDate: moment().subtract(1,"d").format("MMMM Do YYYY"),
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SWITCH_DATE:
            return {
                destination: action.destination,
                header: action.header,
                header2: action.header2,
                currentDate: action.currentDate,
                previousDate: action.previousDate,
            };
        default: 
            return state;
    };
}