interface Observer {
    onChange(task: Task): void;
}

class NPC extends egret.DisplayObjectContainer implements Observer {
    public _emoji: egret.Bitmap;
    public _body: egret.Bitmap;
    private id: string;
    public dialoguePanel: DialoguePanel;
    constructor(id: string, ad: string, x: number, y: number, dp: DialoguePanel) {
        super();
        this._body = new egret.Bitmap();
        this._emoji = new egret.Bitmap();
        this.dialoguePanel = dp;
        this._body.texture = RES.getRes(ad);
        this._emoji.texture = RES.getRes("from_png");
        this.id = id;
        this.x = x;
        this.y = y;
        this._emoji.width = this._emoji.width / 2;
        this._emoji.height = this._emoji.height / 2;
        this._emoji.y = this._body.y-75;
        this._emoji.x = this._body.x;
        this._emoji.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNPCClick, this);

    }

    onChange(task: Task) {
        if (task.status == TaskStatus.ACCEPTABLE && this.id == task.fromNpcId) {
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.toNpcId) {
            this._emoji.texture = RES.getRes("finish_png");
            this._emoji.alpha=1;
        }
        if (task.status == TaskStatus.SUBMITED && this.id == task.toNpcId) {
            this._emoji.alpha = 0;
        }
    }

    onNPCClick() {

        this.dialoguePanel.showDpanel();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);

    }
}

class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    body: egret.Shape;
    textField: egret.TextField;
    textField2: egret.TextField;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.body = new egret.Shape();
        this.textField = new egret.TextField();
        this.body.graphics.beginFill(0x000000, 0.4);
        this.body.graphics.drawRect(0, 0, 300, 200);
        this.body.graphics.endFill();
        this.textField.text = "   任务进程    ";
        this.textField.x = x-25;
        this.textField.y = y+25;
        this.textField2 = new egret.TextField();
        this.textField2.x = x-25;
        this.textField2.y = y + 65;
        this.addChild(this.body);
        this.addChild(this.textField);
        this.addChild(this.textField2);

    }

    onChange(task: Task): void {
        this.textField.text = task.desc;
        this.textField2.text = task.name + " :" + task.status.toString();
    }

}


class DialoguePanel extends egret.DisplayObjectContainer {

    button: Button;
    textField: egret.TextField;
    body: egret.Shape;
    constructor(talk:string) {
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

    disshowDpanel() {
        this.removeChild(this.body);
        this.removeChild(this.button);
        this.removeChild(this.textField);
    }


    onButtonClick() {
        this.disshowDpanel();
        switch (TaskService.getInstance().taskList["000"].status) {
            case TaskStatus.ACCEPTABLE:

                TaskService.getInstance().accept("000");

                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish("000");

                break;
            default:
                return

        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
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