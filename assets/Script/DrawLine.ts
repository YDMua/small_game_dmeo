const { ccclass, property } = cc._decorator

@ccclass
export default class DrawLine extends cc.Component {
  startPoint = null
  endPoint = null

  @property(cc.SpriteFrame)
  line: cc.SpriteFrame = null

  touchStart(event: any) {
    console.log('start', event.getLocation())
    this.startPoint = event.getLocation()
  }
  touchMove(event: any) {}
  touchEnd(event: any) {
    console.log('end', event.getLocation())
    this.endPoint = event.getLocation()

    const startPos = cc.v2(this.startPoint.x, this.startPoint.y)
    const endPos = cc.v2(this.endPoint.x, this.endPoint.y)
    let distance = startPos.sub(endPos).mag()
    console.log('移动距离 ：' + distance)

    // 绘制直线
    // var ctx = cc.find('Canvas/drawLine').getComponent(cc.Graphics)
    // ctx.moveTo(this.startPoint.x, this.startPoint.y)
    // ctx.lineTo(this.endPoint.x, this.endPoint.y)
    // ctx.stroke()

    const newNode = new cc.Node('myNode')
    const sprite = newNode.addComponent(cc.Sprite)
    sprite.spriteFrame = this.line
    newNode.setPosition(this.startPoint.x, this.startPoint.y)
    newNode.height = distance
    console.log('newNode', newNode)
    var r1 = Math.atan2(
      this.endPoint.x - this.startPoint.x,
      this.endPoint.y - this.startPoint.y
    )
    var angle = (180 * r1) / Math.PI //转换为角度值
    newNode.rotation = angle

    this.node.addChild(newNode)
  }

  start() {
    this.node.on('touchstart', this.touchStart, this)
    this.node.on('touchmove', this.touchMove, this)
    this.node.on('touchend', this.touchEnd, this)
  }

  // update (dt) {}
}
