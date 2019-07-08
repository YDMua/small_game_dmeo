"use strict";
cc._RF.push(module, '4d4211BuTRCSr70F0d18EEL', 'ShootControl');
// Script/ShootControl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShootControl = /** @class */ (function (_super) {
    __extends(ShootControl, _super);
    function ShootControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShootControl.prototype.touchStart = function () { };
    ShootControl.prototype.touchEnd = function () {
        // this.node.getComponent('Player').shootControl = this
    };
    ShootControl.prototype.touchMove = function (event) {
        var vx = event.touch.getLocationX(); // 获取当前触点 X 轴位置。
        var vy = event.touch.getLocationY(); //
        var shotline = this.node.getChildByName('player');
        var pos = shotline.getPosition();
        var posX = pos.x;
        var posY = pos.y;
        // var vx2 = posX - vx
        var r1 = Math.atan2(vx - posX, vy - posY);
        var angle = (180 * r1) / Math.PI; //转换为角度值
        // console.log(' Mangle', angle)
        shotline.rotation = angle;
    };
    ShootControl.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    ShootControl = __decorate([
        ccclass
    ], ShootControl);
    return ShootControl;
}(cc.Component));
exports.default = ShootControl;

cc._RF.pop();