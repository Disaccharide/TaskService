var Grid = (function () {
    function Grid(x, y) {
        this._arr = [];
        this.walkable = true;
        this._x = x;
        this._y = y;
        this._arr = new Array();
        for (var i = 0; i < this._x; i++) {
            this._arr[i] = new Array();
            for (var j = 0; j < this._y; j++) {
                this._arr[i][j] = new TileNode(i, j);
            }
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.setWalkable = function (j, i, state) {
        if (state == 0) {
            this._arr[i][j].walkable = false;
        }
        if (state == 1) {
            this._arr[i][j].walkable = true;
        }
    };
    p.setEndPoint = function (x, y) {
        this._end = this._arr[x][y];
    };
    p.setStartPoint = function (x, y) {
        this._start = this._arr[x][y];
    };
    p.getStartPoint = function () {
        return this._start;
    };
    p.getEndPoint = function () {
        return this._end;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map