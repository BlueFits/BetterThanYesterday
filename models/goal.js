export default class Goal {
    constructor(id, goalName, stepsArrayOfObjects, status, startDate ) {
        this.id = id;
        this.goalName = goalName;
        this.stepsArrayOfObjects = stepsArrayOfObjects;
        this.status = status.toLowerCase();
        this.startDate = startDate;
    }
};