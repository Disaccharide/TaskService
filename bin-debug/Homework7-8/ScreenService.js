var SceneService = (function () {
    function SceneService() {
        this.observerList = [];
        SceneService.count++;
        if (SceneService.count > 1) {
            throw "singleton!!!";
        }
    }
    var d = __define,c=SceneService,p=c.prototype;
    SceneService.getInstance = function () {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    };
    p.addObserver = function (observer) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (observer == this.observerList[i])
                return ErrorCode.REPEAT_OBSERVER;
        }
        this.observerList.push(observer);
    };
    p.notify = function (task) {
        for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
    };
    SceneService.count = 0;
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService',["EventEmitter"]);
//# sourceMappingURL=ScreenService.js.map