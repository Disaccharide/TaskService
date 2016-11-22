var StateMachine = (function () {
    function StateMachine() {
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.setState = function (e) {
        if (this.currentState != null) {
            this.currentState.onExit();
        }
        this.currentState = e;
        e.onEnter();
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
var CharacterState = (function (_super) {
    __extends(CharacterState, _super);
    function CharacterState(character) {
        _super.call(this);
        this._character = character;
    }
    var d = __define,c=CharacterState,p=c.prototype;
    p.onEnter = function () { };
    p.onExit = function () { };
    return CharacterState;
}(StateMachine));
egret.registerClass(CharacterState,'CharacterState');
var CharacterIdleState = (function (_super) {
    __extends(CharacterIdleState, _super);
    function CharacterIdleState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=CharacterIdleState,p=c.prototype;
    p.onEnter = function () {
        this._character._ifidle = true;
    };
    p.onExit = function () {
        this._character._ifidle = false;
    };
    return CharacterIdleState;
}(CharacterState));
egret.registerClass(CharacterIdleState,'CharacterIdleState');
var CharacterMoveState = (function (_super) {
    __extends(CharacterMoveState, _super);
    function CharacterMoveState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=CharacterMoveState,p=c.prototype;
    p.onEnter = function () {
        this._character._ifmove = true;
    };
    p.onExit = function () {
        this._character._ifmove = false;
    };
    return CharacterMoveState;
}(CharacterState));
egret.registerClass(CharacterMoveState,'CharacterMoveState');
//# sourceMappingURL=StateMachine.js.map