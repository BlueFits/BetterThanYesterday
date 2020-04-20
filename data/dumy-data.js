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
            ),
        ],
    ),
];

export default USERS;