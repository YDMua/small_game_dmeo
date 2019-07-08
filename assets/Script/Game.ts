const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  keyPrefab: cc.Prefab = null

  @property(cc.Node)
  player: cc.Node = null
  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {
    for (let i = 0; i < 10; i++) {
      this.spawnNewKey()
    }
  }

  // 生成预制钥匙
  spawnNewKey() {
    const newKey = cc.instantiate(this.keyPrefab)
    this.node.addChild(newKey)
    // 获取钥匙的随机位置
    newKey.setPosition(this.getNewKeyPosition())
    newKey.getComponent('Key').game = this
  }

  getNewKeyPosition() {
    const randCount = Math.random()
    let randX = 0
    if (randCount > 0.5) {
      randX = (Math.random() * this.node.width) / 2
    } else {
      randX = (Math.random() * -this.node.width) / 2
    }
    let randY = (Math.random() * this.node.height) / 2
    return cc.v2(randX, randY)
  }

  // update (dt) {}
}
