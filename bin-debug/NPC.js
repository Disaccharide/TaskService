var NPClist01 = ["01_01_png", "01_02_png", "01_03_png", "01_04_png", "01_05_png",
    "01_06_png", "01_07_png", "01_08_png", "01_09_png", "01_10_png"];
var count = -1;
count = count + 0.2;
if (count >= NPClist01.length) {
    count = 0;
    this._body.texture = RES.getRes(NPClist01[Math.floor(count)]);
}
var NPClist02 = ["02_01_png", "02_02_png", "02_03_png", "02_04_png",
    "02_05_png", "02_06_png", "02_07_png", "02_08_png", "02_09_png"];
var count = -1;
count = count + 0.2;
if (count >= NPClist02.length) {
    count = 0;
    this._body.texture = RES.getRes(NPClist02[Math.floor(count)]);
}
//# sourceMappingURL=NPC.js.map