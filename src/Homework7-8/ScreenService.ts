class SceneService implements EventEmitter {
    
private observerList: Observer[] = [];
private static instance;
private static count = 0;
constructor() {
        SceneService.count++;
        if (SceneService.count > 1) {
            throw "singleton!!!";
        }
    }
    public static getInstance() {
        if (SceneService.instance == null) {
            SceneService.instance = new SceneService();
        }
        return SceneService.instance;
    }

     public addObserver(observer: Observer) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (observer == this.observerList[i])
                return ErrorCode.REPEAT_OBSERVER;
        }
        this.observerList.push(observer);
    }

     public notify(task: Task) {
      
        for (var observer of this.observerList) {
            observer.onChange(task);
        }
    }
}