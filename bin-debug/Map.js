var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap() {
        _super.call(this);
        this._cellSize = 20;
        this.astar = new AStar();
        this._grid = new Grid(10, 10);
        var container = new egret.DisplayObjectContainer();
        this.addChild(container);
        for (var i = 0; i < config.length; i++) {
            for (var j = 0; j < config.length; j++) {
                var tile = config[i][j];
                var bitmap = new egret.Bitmap();
                bitmap.width = 100;
                bitmap.height = 100;
                bitmap.x = j * 100;
                bitmap.y = i * 100;
                this.addChild(bitmap);
                if (tile == 1) {
                    bitmap.texture = RES.getRes("map01_png");
                }
                if (tile == 0) {
                    bitmap.texture = RES.getRes("map02_png");
                }
                this._grid.setWalkable(i, j, tile);
                container.addChild(bitmap);
            }
        }
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.astarPath = function (beginX, beginY, endX, endY) {
        var path = new Array();
        this._grid.setStartPoint(beginX, beginY);
        this._grid.setEndPoint(endX, endY);
        if (this.astar.findPath(this._grid)) {
            path = this.astar.getPath();
        }
        return path;
    };
    return TileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(TileMap,'TileMap');
var config = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]];
//# sourceMappingURL=Map.js.map