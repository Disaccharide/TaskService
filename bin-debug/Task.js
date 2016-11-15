var Task = (function () {
    function Task(id, name) {
        this._id = id;
        this._name = name;
    }
    var d = __define,c=Task,p=c.prototype;
    d(p, "status"
        ,function () {
            return this._status;
        }
        ,function (value) {
            this._status = value;
        }
    );
    d(p, "id"
        ,function () {
            return this._id;
        }
        ,function (id) {
            this._id = id;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
        ,function (name) {
            this._name = name;
        }
    );
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITED"] = 4] = "SUBMITED";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map