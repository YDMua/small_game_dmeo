"use strict";
cc._RF.push(module, 'be21aUJ9G5Im6geGb6i3ChH', 'DrawLine');
// Script/DrawLine.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DrawLine = /** @class */ (function (_super) {
    __extends(DrawLine, _super);
    function DrawLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startPoint = null;
        _this.endPoint = null;
        _this.line = null;
        return _this;
        // update (dt) {}
    }
    DrawLine.prototype.touchStart = function (event) {
        console.log('start', event.getLocation());
        this.startPoint = event.getLocation();
    };
    DrawLine.prototype.touchMove = function (event) { };
    DrawLine.prototype.touchEnd = function (event) {
        console.log('end', event.getLocation());
        this.endPoint = event.getLocation();
        var startPos = cc.v2(this.startPoint.x, this.startPoint.y);
        var endPos = cc.v2(this.endPoint.x, this.endPoint.y);
        var distance = startPos.sub(endPos).mag();
        console.log('移动距离 ：' + distance);
        // 绘制直线
        // var ctx = cc.find('Canvas/drawLine').getComponent(cc.Graphics)
        // ctx.moveTo(this.startPoint.x, this.startPoint.y)
        // ctx.lineTo(this.endPoint.x, this.endPoint.y)
        // ctx.stroke()
        var newNode = new cc.Node('myNode');
        var sprite = newNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.line;
        newNode.setPosition(this.startPoint.x, this.startPoint.y);
        newNode.height = distance;
        console.log('newNode', newNode);
        var r1 = Math.atan2(this.endPoint.x - this.startPoint.x, this.endPoint.y - this.startPoint.y);
        var angle = (180 * r1) / Math.PI; //转换为角度值
        newNode.rotation = angle;
        this.node.addChild(newNode);
    };
    DrawLine.prototype.start = function () {
        this.node.on('touchstart', this.touchStart, this);
        this.node.on('touchmove', this.touchMove, this);
        this.node.on('touchend', this.touchEnd, this);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], DrawLine.prototype, "line", void 0);
    DrawLine = __decorate([
        ccclass
    ], DrawLine);
    return DrawLine;
}(cc.Component));
exports.default = DrawLine;

cc._RF.pop();