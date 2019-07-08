"use strict";
cc._RF.push(module, 'da399F7bJxOT7Jr8W80h2N/', 'Key');
// Script/Key.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Key = /** @class */ (function (_super) {
    __extends(Key, _super);
    function Key() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 判断
    Key.prototype.getCollision = function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    };
    Key.prototype.start = function () { };
    Key.prototype.update = function (dt) {
        if (this.getCollision() < 60) {
            // this.onPicked();
            this.node.destroy();
            return;
        }
    };
    Key = __decorate([
        ccclass
    ], Key);
    return Key;
}(cc.Component));
exports.default = Key;

cc._RF.pop();