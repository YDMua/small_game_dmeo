const { ccclass, property } = cc._decorator
import Game from './Game'

@ccclass
export default class Key extends cc.Component {
  game: Game

  // 判断
  getCollision() {
    // 根据 player 节点位置判断距离
    const playerPos = this.game.player.getPosition()
    // 根据两点位置计算两点之间距离
    const dist = this.node.position.sub(playerPos).mag()
    return dist
  }
  start() {}

  update(dt) {
    if (this.getCollision() < 60) {
      // this.onPicked();
      this.node.destroy()
      return
    }
  }
}
