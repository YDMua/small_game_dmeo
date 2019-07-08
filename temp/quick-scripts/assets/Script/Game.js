(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ab097fOUH9Hbo1YbLANqXP6', 'Game', __filename);
// Script/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyPrefab = null;
        _this.player = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () { };
    NewClass.prototype.start = function () {
        for (var i = 0; i < 10; i++) {
            this.spawnNewKey();
        }
    };
    // 生成预制钥匙
    NewClass.prototype.spawnNewKey = function () {
        var newKey = cc.instantiate(this.keyPrefab);
        this.node.addChild(newKey);
        // 获取钥匙的随机位置
        newKey.setPosition(this.getNewKeyPosition());
        newKey.getComponent('Key').game = this;
    };
    NewClass.prototype.getNewKeyPosition = function () {
        var randCount = Math.random();
        var randX = 0;
        if (randCount > 0.5) {
            randX = (Math.random() * this.node.width) / 2;
        }
        else {
            randX = (Math.random() * -this.node.width) / 2;
        }
        var randY = (Math.random() * this.node.height) / 2;
        return cc.v2(randX, randY);
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "keyPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "player", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        