export default class Goal {
    constructor(id, goalName, steps, status, startDate, goalColor ) {
        this._id = id;
        this.goalName = goalName;
        this.steps = steps;
        this.status = status.toLowerCase();
        this.startDate = startDate;
        this.goalColor = goalColor;
    }
};