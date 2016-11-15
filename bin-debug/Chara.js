var Character = (function (_super) {
    __extends(Character, _super);
    function Character(main) {
        _super.call(this);
        this._idleState = new CharacterIdleState(this);
        this._moveState = new CharacterMoveState(this);
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
    var d = __define,c=Character,p=c.prototype;
    p.move = function (targetX, targetY, path) {
        egret.Tween.removeTweens(this._body);
        this._stateMachine.setState(this._moveState);
        if (this._ifmove) {
            if (targetX > this._body.x) {
                this._body.skewY = 0;
            }
            else {
            }
            this.startMove();
            var interval = 500;
            var timer = new egret.Timer(interval, path.length - 1);
            timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
                egret.Tween.get(this._body).to({ x: (path[timer.currentCount].x + 1) * 100, y: (path[timer.currentCount].y) * 100 }, 500);
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
                this.idle();
            }, this);
            timer.start();
        }
    };
    p.idle = function () {
        this._stateMachine.setState(this._idleState);
        if (this._ifidle) {
            this.startidle();
        }
    };
    p.startMove = function () {
        var _this = this;
        var list = ["run_01_png", "run_02_png", "run_03_png", "run_04_png",
            "run_05_png", "run_06_png", "run_07_png", "run_08_png"];
        var count = -1;
        egret.Ticker.getInstance().register(function () {
            if (_this._ifmove) {
                count = count + 0.2;
                if (count >= list.length) {
                    count = 0;
                }
                _this._body.texture = RES.getRes(list[Math.floor(count)]);
            }
        }, this);
    };
    p.startidle = function () {
        var _this = this;
        var list = ["stand_01_png", "stand_02_png", "stand_03_png", "stand_04_png", "stand_05_png",
            "stand_06_png", "stand_07_png", "stand_08_png", "stand_09_png", "stand_10_png"];
        var count = -1;
        egret.Ticker.getInstance().register(function () {
            if (_this._ifidle) {
                count = count + 0.2;
                if (count >= list.length) {
                    count = 0;
                }
                _this._body.texture = RES.getRes(list[Math.floor(count)]);
            }
        }, this);
    };
    return Character;
}(egret.DisplayObjectContainer));
egret.registerClass(Character,'Character');
//# sourceMappingURL=Chara.js.map