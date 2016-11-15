var TileNode = (function () {
    function TileNode(x, y) {
        this.walkable = true;
        this.x = x;
        this.y = y;
        if (config[x][y] == 0) {
            this.walkable = false;
        }
        if (config[x][y] == 1) {
            this.walkable = true;
        }
    }
    var d = __define,c=TileNode,p=c.prototype;
    return TileNode;
}());
egret.registerClass(TileNode,'TileNode');
//# sourceMappingURL=Node.js.map