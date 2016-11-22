interface Observer {
    onChange(task: Task): void;
}

class NPC extends egret.DisplayObjectContainer implements Observer {
    public _emoji: egret.Bitmap;
    public _body: egret.Bitmap;
    private _id: string;
    public dialoguePanel: DialoguePanel;
    constructor(id: string, ad: string, x: number, y: number, dp: DialoguePanel) {
        super();
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

    get id(): string {
        return this._id;
    }

    onChange(task: Task) {
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
    }


    onNPCClick() {
        this.dialoguePanel.showDpanel();
    }
}

class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    body: egret.Shape;
    textField: egret.TextField;
    textField2: egret.TextField;
    textField3: egret.TextField;
    constructor(x: number, y: number) {
        super();
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

    onChange(task: Task): void {
        this.textField.text = task.desc;
        this.textField2.text = task.name + " :" + task.status.toString();
        this.textField3.text = task.name + " :" + task.getcurrent() + "/" + task.total;
    }

}


class DialoguePanel extends egret.DisplayObjectContainer {

    button: Button;
    textField: egret.TextField;
    body: egret.Shape;
    currentTask: Task;
    linkNPC: NPC;
    nextTask: Task;

    constructor(talk: string) {
        super();
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

    showDpanel() {
        this.addChild(this.body);
        this.addChild(this.button);
        this.addChild(this.textField);
    }

    public updateViewByTask(task: Task) {
        this.currentTask = task;
        if (task.id == "000" && this.linkNPC.id == "NPC_2") {
            this.textField.text = "请帮我砍树";
        }
        else {
            this.textField.text = this.currentTask.NPCTaskTalk;
        }
    }

    disshowDpanel() {
        this.removeChild(this.body);
        this.removeChild(this.button);
        this.removeChild(this.textField);
    }


    onButtonClick() {

        this.disshowDpanel();
        switch (this.currentTask.status) {
            case TaskStatus.ACCEPTABLE:

                TaskService.getInstance().accept(this.currentTask.id);

                break;
            case TaskStatus.CAN_SUBMIT:

                TaskService.getInstance().finish(this.currentTask.id);

                if (TaskService.getInstance().getNextTask() != null)
                { TaskService.getInstance().getNextTask().status = TaskStatus.ACCEPTABLE; }

                if (TaskService.getInstance().getTaskByCustomRule() != null) {
                    this.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
                    TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
                }

                break;
            default:
                break;

        }
    }

}

class Button extends egret.DisplayObjectContainer {
    body: egret.Bitmap;
    constructor(ad: string) {
        super();
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.addChild(this.body);
        this.touchEnabled = true;
    }
}

class MockKillMonsterButton extends Button implements Observer {
    public count = 0;
    public linkTask: string;

    constructor(ad: string, linkTask: string) {
        super(ad);
        this.linkTask = linkTask;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
        egret.Ticker.getInstance().register(() => {
        }, this);
    }

    onButtonClick() {

        if (TaskService.getInstance().taskList[this.linkTask].status == TaskStatus.DURING) {
            SceneService.getInstance().notify(TaskService.getInstance().taskList[this.linkTask]);
        }
    }

    onChange() {

    }
}