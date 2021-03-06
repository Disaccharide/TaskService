//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */

    private createGameScene(): void {

        var map: TileMap = new TileMap();
        this.addChild(map);

        var Dpanel_1: DialoguePanel = new DialoguePanel("请寻找草精。");
        var Dpanel_2: DialoguePanel = new DialoguePanel("请帮我砍掉");
        var NPC_1: NPC = new NPC("NPC_1", "01_01_png", 875, 75, Dpanel_1);
        var NPC_2: NPC = new NPC("NPC_2", "02_01_png", 25, 800, Dpanel_2);

        Dpanel_1.linkNPC = NPC_1;
        Dpanel_2.linkNPC = NPC_2;

        var task_0: Task = new Task("000", "寻找任务", new NPCTalkTaskCondition());
        task_0.fromNpcId = "NPC_1";
        task_0.toNpcId = "NPC_2";
        task_0.desc = "先跟孤魂对话，再跟草精对话";
        task_0.NPCTaskTalk = "请跟草精对话，他看起来需要帮助";
        task_0.total = 1;
        task_0.status = TaskStatus.ACCEPTABLE;

        var task_1: Task = new Task("001", "杀怪任务", new KillMonsterTaskCondition());
        task_1.fromNpcId = "NPC_2";
        task_1.toNpcId = "NPC_2";
        task_1.desc = "再次跟草精对话，接任务后击杀怪物";
        task_1.NPCTaskTalk = "请帮我砍10棵树";
        task_1.total = 10;
        task_1.status = TaskStatus.UNACCEPTABLE;

        TaskService.getInstance().addTask(task_0);
        TaskService.getInstance().addTask(task_1);
        var mainPanel: TaskPanel = new TaskPanel(50, 0);
        TaskService.getInstance().addObserver(mainPanel);
        TaskService.getInstance().addObserver(NPC_1);
        TaskService.getInstance().addObserver(NPC_2);
        this.addChild(mainPanel);
        this.addChild(NPC_1);
        this.addChild(NPC_2);
        this.addChild(Dpanel_1);
        this.addChild(Dpanel_2);


        TaskService.getInstance().notify(TaskService.getInstance().getTaskByCustomRule());
        Dpanel_1.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());
        Dpanel_2.updateViewByTask(TaskService.getInstance().getTaskByCustomRule());

        var monster_1: MockKillMonsterButton = new MockKillMonsterButton("tree_png","001");
        this.addChild(monster_1);
        monster_1.body.x = 275;
        monster_1.body.y = 600;
        monster_1.body.width = 133;
        monster_1.body.height = 130;

        var chara: Character = new Character(this);
        this.addChild(chara);
        chara.idle();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent): void {
            var startx: number = Math.floor((chara._body.x) / 100);
            var starty: number = Math.floor(chara._body.y / 100);
            var endx: number = Math.floor(e.localX / 100);
            var endy: number = Math.floor(e.localY / 100);
            var path: TileNode[] = map.astarPath(startx - 1, starty, endx, endy);
            if (path.length > 0) {
                chara.move(e.localX, e.localY, path);
            }
        }, this);
    }
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


