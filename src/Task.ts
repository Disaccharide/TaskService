class Task {

    private _id: string;
    private _name: string;
    private _status: TaskStatus;

    public fromNpcId: string;
    public toNpcId: string;
    public desc: string;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

    }
    public get status(): TaskStatus {

        return this._status;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set status(value: TaskStatus) {
        this._status = value;

    }
    public set name(name: string) {
        this._name = name;
    }

    public set id(id: string) {
        this._id = id;
    }

}

enum TaskStatus {

    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITED
}
