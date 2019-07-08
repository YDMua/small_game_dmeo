const { ccclass, property } = cc._decorator

@ccclass
export default class Start extends cc.Component {
  start() {
    this.node.on(
      'touchstart',
      () => {
        cc.director.loadScene('')
      },
      this
    )
    const scaleTo = cc.scaleTo(0.8, 0.9)
    const reverse = cc.scaleTo(0.8, 1)
    const sequ = cc.sequence(scaleTo, reverse)
    const repeat = cc.repeatForever(sequ)
    this.node.runAction(repeat)
  }
  // update (dt) {}
}
