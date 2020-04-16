import User from "../models/user";
import Goal from "../models/goal";
import Task from "../models/task";

const USERS = [
    new User(
        "id1",
        "user1",
        [
            new Goal(
                "goalId1", 
                "Entrepeneur",
                [
                    new Task("taskId1", "Active Ideation", ["Brainstorm in the morning"]),
                ] 
            ),
        ],
    ),
];

export default USERS;