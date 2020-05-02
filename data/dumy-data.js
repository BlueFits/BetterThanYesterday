import User from "../models/user";
import Goal from "../models/goal";
import Step from "../models/step";
import Task from "../models/task";
import moment from "moment";

const USERS = [
    new User(
        "id1",
        "user1",
        [
            new Goal(
                "goalId1", 
                "Entrepeneur",
                [
                    new Step("stepId1", "Active Ideation", false, [
                        new Task(
                            "taskId1",
                            moment().subtract(1,"d").format("MMMM Do YYYY"),
                            ["something here"]
                        ),
                    ]),
                ],
                 "on-going",
                 "Aug 22, 2019",
                 "#2ecc71"
            ),
            new Goal(
                "goalId2", 
                "Super-Fit",
                [],
                 "on-going",
                 "Aug 22, 2019",
                 "#2ecc71"
            ),
        ],
    ),
];

export default USERS;