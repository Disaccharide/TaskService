class Character extends egret.DisplayObjectContainer {

    _main: Main;
    _stateMachine: StateMachine;
    _body: egret.Bitmap;
    _ifidle: boolean;
    _ifmove: boolean;
    _idleState: CharacterIdleState = new CharacterIdleState(this);
    _moveState: CharacterMoveState = new CharacterMoveState(this);

    constructor(main: Main) {
        super();
        this._main = main;
        this._body = new egret.Bitmap;
        this._body.texture = RES.getRes("stand_01_png");
        this._main.addChild(this._body);
        this._body.width = 100;
        this._body.height = 100;
        this._body.anchorOffsetX = this._body.width * 1;
        this._body.anchorOffsetY = this._body.height * 0;
        this._stateMachine = new StateMachine();
        this._body.x = 200;
        this._body.y = 200;
        this._ifidle = true;
        this._ifmove = false;
    }

    public move(targetX: number, targetY: number, path: TileNode[]) {

        egret.Tween.removeTweens(this._body);
        this._stateMachine.setState(this._moveState);

        if (this._ifmove) {
            if (targetX > this._body.x) {
                this._body.skewY = 0;
            }
            else {
            }
            this.startMove();

            var interval:number = 500;
            var timer: egret.Timer = new egret.Timer(interval, path.length - 1);
            timer.addEventListener(egret.TimerEvent.TIMER, function (e: egret.TimerEvent): void {
                egret.Tween.get(this._body).to({ x: (path[timer.currentCount].x + 1) * 100, y: (path[timer.currentCount].y) * 100 }, 500);
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e: egret.TimerEvent): void {
                this.idle();
            }, this);
            timer.start();
        }
    }


    public idle() {

        this._stateMachine.setState(this._idleState);

        if (this._ifidle) {
            this.startidle();
        }
    }

    public startMove() {
        var list = ["run_01_png", "run_02_png","run_03_png","run_04_png",
        "run_05_png","run_06_png","run_07_png","run_08_png"];
        var count = -1;
        egret.Ticker.getInstance().register(() => {
            if (this._ifmove) {
                count = count + 0.2;
                if (count >= list.length) {
                    count = 0;
                }
                this._body.texture = RES.getRes(list[Math.floor(count)]);
            }
        }, this);

    }

    public startidle() {

        var list = ["stand_01_png", "stand_02_png","stand_03_png","stand_04_png","stand_05_png",
        "stand_06_png","stand_07_png","stand_08_png","stand_09_png","stand_10_png"];
        var count = -1;
        egret.Ticker.getInstance().register(() => {
            if (this._ifidle) {
                count = count + 0.2;
                if (count >= list.length) {
                    count = 0;
                }
                this._body.texture = RES.getRes(list[Math.floor(count)]);
            }
        }, this);
    }

}