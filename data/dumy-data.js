import User from "../models/user";
import Goal from "../models/goal";
import Step from "../models/step";

const USERS = [
    new User(
        "id1",
        "user1",
        [
            new Goal(
                "goalId1", 
                "Entrepeneur",
                [
                    new Step("taskId1", "Active Ideation", false, ["Brainstorm in the morning"]),
                    new Step("taskId2", "Sumn", false, ["Brainstorm in the morning"]),
                ],
                 "on-going",
                 "Aug 22, 2019",
                 "#2ecc71"
            ),
            new Goal(
                "goalId2", 
                "Super-Fit",
                [
                    new Step("taskId1", "Work out", false, ["Eat good"]),
                ],
                 "on-going",
                 "Aug 22, 2019",
                 "#2ecc71"
            ),
        ],
    ),
];

export default USERS;