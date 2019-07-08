const { ccclass, property } = cc._decorator

@ccclass
export default class ShootControl extends cc.Component {
  touchStart() {}

  touchEnd() {
    // this.node.getComponent('Player').shootControl = this
  }
  touchMove(event: any) {
    var vx = event.touch.getLocationX() // 获取当前触点 X 轴位置。
    var vy = event.touch.getLocationY() //
    var shotline = this.node.getChildByName('player')

    var pos = shotline.getPosition()
    var posX = pos.x
    var posY = pos.y

    // var vx2 = posX - vx
    var r1 = Math.atan2(vx - posX, vy - posY)
    var angle = (180 * r1) / Math.PI //转换为角度值
    // console.log(' Mangle', angle)
    shotline.rotation = angle
  }
  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this)
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this)
  }

  // update (dt) {}
}
