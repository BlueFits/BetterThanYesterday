export default class Step {
    constructor(id, stepName, isComplete, tasks) {
        this.id = id;
        this.stepName = stepName;
        this.isComplete = isComplete;
        this.tasks = tasks;
    }
};