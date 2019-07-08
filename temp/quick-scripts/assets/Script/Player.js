(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '66753toHzZKyI27BKT1Ga3M', 'Player', __filename);
// Script/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 跳跃的时间间隔
        _this.jumpDuration = 0;
        // 跳跃的高度
        _this.jumpHeight = 0;
        // 辅助形变动作时间
        _this.squashDuration = 0;
        // 加速度
        _this.accel = 0;
        // 最大加速度
        _this.maxMoveSpeed = 0;
        // 向右移动
        _this.accLeft = false;
        // 向左移动
        _this.accRight = false;
        // 获取到父节点Canvas对象
        _this.game = null;
        _this.xSpeed = 0;
        _this.canJump = true;
        _this.initY = 0; // 获取初始化高度
        return _this;
    }
    Player.prototype.setJumpAction = function () {
        this.canJump = false;
        var jumpHeight = (Math.random() + 1) * 2 * this.jumpHeight;
        // 跳跃上升
        var jumpUp = cc
            .moveBy(this.jumpDuration, cc.v2(0, jumpHeight))
            .easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc
            .moveBy(this.jumpDuration, cc.v2(0, -jumpHeight))
            .easing(cc.easeCubicActionIn());
        // 形变
        var squash = cc.scaleTo(this.squashDuration, 1, 0.6);
        var stretch = cc.scaleTo(this.squashDuration, 1, 1.1);
        var scaleBack = cc.scaleTo(this.squashDuration, 1, 1);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        var callbackFun = cc.callFunc(this.callbackFun, this);
        var sequ = cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callbackFun);
        this.node.runAction(sequ);
    };
    Player.prototype.callbackFun = function () {
        console.log('进来了');
        this.canJump = true;
        this.xSpeed = 0;
    };
    // 按下键盘
    Player.prototype.onKeyDown = function (event) {
        if (this.canJump) {
            this.setJumpAction();
            // set a flag when key pressed
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = true;
                    this.accRight = false;
                    break;
                case cc.macro.KEY.d:
                    this.accRight = true;
                    this.accLeft = false;
                    break;
            }
        }
    };
    // 释放键盘
    Player.prototype.onKeyUp = function (event) {
        if (this.canJump) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = false;
                    break;
                case cc.macro.KEY.d:
                    this.accRight = false;
                    break;
            }
        }
    };
    Player.prototype.start = function () {
        // 获取初始化物体的y坐标
        this.initY = this.node.y;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // 获取到父组件Canvas
        this.game = cc.find('Canvas');
    };
    Player.prototype.update = function (dt) {
        if (!this.canJump) {
            if (this.accLeft) {
                // this.node.x -= 10
                this.xSpeed -= this.accel * dt;
            }
            if (this.accRight) {
                this.xSpeed += this.accel * dt;
            }
            // 限制主角的速度不能超过最大值
            if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
                // if speed reach limit, use max speed with current direction
                this.xSpeed = (this.maxMoveSpeed * this.xSpeed) / Math.abs(this.xSpeed);
            }
            // 根据当前速度更新主角的位置
            this.node.x += this.xSpeed * dt;
            if (this.node.x > this.node.parent.width / 2) {
                this.node.x = this.node.parent.width / 2;
                this.xSpeed = 0;
            }
            else if (this.node.x < -this.node.parent.width / 2) {
                this.node.x = -this.node.parent.width / 2;
                this.xSpeed = 0;
            }
        }
    };
    __decorate([
        property
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property
    ], Player.prototype, "squashDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "accel", void 0);
    __decorate([
        property
    ], Player.prototype, "maxMoveSpeed", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
        //# sourceMappingURL=Player.js.map
        