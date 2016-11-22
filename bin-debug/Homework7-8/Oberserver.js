var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, ad, x, y, dp) {
        _super.call(this);
        this._body = new egret.Bitmap();
        this._emoji = new egret.Bitmap();
        this.dialoguePanel = dp;
        this._body.texture = RES.getRes(ad);
        this._emoji.texture = RES.getRes("from_png");
        this._id = id;
        this.x = x;
        this.y = y;
        this._emoji.width = this._emoji.width / 2;
        this._emoji.height = this._emoji.height / 2;
        this._emoji.y = this._body.y - 75;
        this._emoji.x = this._body.x;
        this._emoji.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNPCClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
    );
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE && this.id == task.fromNpcId) {
            this._emoji.texture = RES.getRes("to_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.DURING && this.id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.DURING && this.id == task.toNpcId) {
            this._emoji.texture = RES.getRes("finish_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.toNpcId) {
            this._emoji.texture = RES.getRes("finish_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.SUBMITED && this.id == task.toNpcId) {
            this._emoji.alpha = 0;
        }
    };
    p.onNPCClick = function () {
        this.dialoguePanel.showDpanel();
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0x000000, 0.4);
        this.body.graphics.drawRect(0, 0, 300, 200);
        this.body.graphics.endFill();
        this.textField = new egret.TextField();
        this.textField.text = "   任务进程    ";
        this.textField.x = x + 300;
        this.textField.y = y + 50;
        this.addChild(this.textField);
        this.textField2 = new egret.TextField();
        this.textField2.text = "   任务状态    ";
        this.textField2.x = x + 300;
        this.textField2.y = y + 100;
        this.addChild(this.body);
        this.addChild(this.textField2);
        this.textField3 = new egret.TextField();
        this.textField2.text = "   进度    ";
        this.textField3.x = x + 20;
        this.textField3.y = y + 55;
        this.addChild(this.body);
        this.addChild(this.textField3);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.textField.text = task.desc;
        this.textField2.text = task.name + " :" + task.status.toString();
        this.textField3.text = task.name + " :" + task.getcurrent() + "/" + task.total;
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(talk) {
        _super.call(this);
        this.body = new egret.Shape();
        this.body.graphics.beginFill(0x000000, 0.5);
        this.body.graphics.drawRect(0, 0, 500, 150);
        this.body.graphics.endFill();
        this.body.x = 250;
        this.body.y = 250;
        this.textField = new egret.TextField();
        this.textField.text = talk;
        this.button = new Button("to_png");
        this.textField.x = 300;
        this.textField.y = 300;
        this.button.width = 40;
        this.button.height = 40;
        this.button.x = 680;
        this.button.y = 330;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.showDpanel = function () {
        this.addChild(this.body);
        this.addChild(this.button);
        this.addChild(this.textField);
    };
    p.updateViewByTask = function (task) {
        this.currentTask = task;
        if (task.id == "000" && this.linkNPC.id == "NPC_2") {
            this.textField.text = "请帮我砍树";
        }
        else {
            this.textField.text = this.currentTask.NPCTaskTalk;
        }
    };
    p.disshowDpanel = function () {
        this.removeChild(this.body);
        this.removeChild(this.button);
        this.removeChild(this.textField);
    };
    p.onButtonClick = function () {
        this.disshowDpanel();
        switch (this.currentTask.status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept(this.currentTask.id);
                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish(this.currentTask.id);
                if (TaskService.getInstance().getNextTask() != null) {
                    TaskService.getInstance().getNextTask().status = TaskStatus.ACCEPTABLE;
                }
                if (TaskService.getInstance().getTaskByCustomRule() != null) {
                    this.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
                    TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
                }
                break;
            default:
                break;
        }
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(ad) {
        _super.call(this);
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.addChild(this.body);
        this.touchEnabled = true;
    }
    var d = __define,c=Button,p=c.prototype;
    return Button;
}(egret.DisplayObjectContainer));
egret.registerClass(Button,'Button');
var MockKillMonsterButton = (function (_super) {
    __extends(MockKillMonsterButton, _super);
    function MockKillMonsterButton(ad, linkTask) {
        _super.call(this, ad);
        this.count = 0;
        this.linkTask = linkTask;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
        egret.Ticker.getInstance().register(function () {
        }, this);
    }
    var d = __define,c=MockKillMonsterButton,p=c.prototype;
    p.onButtonClick = function () {
        if (TaskService.getInstance().taskList[this.linkTask].status == TaskStatus.DURING) {
            SceneService.getInstance().notify(TaskService.getInstance().taskList[this.linkTask]);
        }
    };
    p.onChange = function () {
    };
    return MockKillMonsterButton;
}(Button));
egret.registerClass(MockKillMonsterButton,'MockKillMonsterButton',["Observer"]);
//# sourceMappingURL=Oberserver.js.map