const { ccclass, property } = cc._decorator
import ShootControl from './ShootControl'

@ccclass
export default class Player extends cc.Component {
  // 跳跃的时间间隔
  @property
  jumpDuration: number = 0

  // 跳跃的高度
  @property
  jumpHeight: number = 0

  // 辅助形变动作时间
  @property
  squashDuration: number = 0

  // 加速度
  @property
  accel: number = 0

  // 最大加速度
  @property
  maxMoveSpeed: number = 0

  // 向右移动
  accLeft = false

  // 向左移动
  accRight = false

  // 获取到父节点Canvas对象
  game = null
  shootControl: ShootControl
  xSpeed = 0
  canJump = true
  initY = 0 // 获取初始化高度

  setJumpAction() {
    this.canJump = false
    const jumpHeight = (Math.random() + 1) * 2 * this.jumpHeight
    // 跳跃上升
    var jumpUp = cc
      .moveBy(this.jumpDuration, cc.v2(0, jumpHeight))
      .easing(cc.easeCubicActionOut())
    // 下落
    var jumpDown = cc
      .moveBy(this.jumpDuration, cc.v2(0, -jumpHeight))
      .easing(cc.easeCubicActionIn())
    // 形变
    const squash = cc.scaleTo(this.squashDuration, 1, 0.6)
    const stretch = cc.scaleTo(this.squashDuration, 1, 1.1)
    const scaleBack = cc.scaleTo(this.squashDuration, 1, 1)
    // 不断重复，而且每次完成落地动作后调用回调来播放声音
    const callbackFun = cc.callFunc(this.callbackFun, this)
    const sequ = cc.sequence(
      squash,
      stretch,
      jumpUp,
      scaleBack,
      jumpDown,
      callbackFun
    )
    this.node.runAction(sequ)
  }

  callbackFun() {
    console.log('进来了')
    this.canJump = true
    this.xSpeed = 0
  }
  // 按下键盘
  onKeyDown(event: any) {
    if (this.canJump) {
      this.setJumpAction()
      // set a flag when key pressed
      switch (event.keyCode) {
        case cc.macro.KEY.a:
          this.accLeft = true
          this.accRight = false
          break
        case cc.macro.KEY.d:
          this.accRight = true
          this.accLeft = false
          break
      }
    }
  }

  // 释放键盘
  onKeyUp(event: any) {
    if (this.canJump) {
      switch (event.keyCode) {
        case cc.macro.KEY.a:
          this.accLeft = false
          break
        case cc.macro.KEY.d:
          this.accRight = false
          break
      }
    }
  }

  start() {
    // 获取初始化物体的y坐标
    this.initY = this.node.y

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)

    // 获取到父组件Canvas
    this.game = cc.find('Canvas')
  }

  update(dt: number) {
    if (!this.canJump) {
      if (this.accLeft) {
        // this.node.x -= 10
        this.xSpeed -= this.accel * dt
      }

      if (this.accRight) {
        this.xSpeed += this.accel * dt
      }

      // 限制主角的速度不能超过最大值
      if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
        // if speed reach limit, use max speed with current direction
        this.xSpeed = (this.maxMoveSpeed * this.xSpeed) / Math.abs(this.xSpeed)
      }

      // 根据当前速度更新主角的位置
      this.node.x += this.xSpeed * dt

      if (this.node.x > this.node.parent.width / 2) {
        this.node.x = this.node.parent.width / 2
        this.xSpeed = 0
      } else if (this.node.x < -this.node.parent.width / 2) {
        this.node.x = -this.node.parent.width / 2
        this.xSpeed = 0
      }
    }
  }
}
