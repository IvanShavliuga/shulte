<template>
<div>
 <section
    :style="
      'width:' +
      (0 + game.columns.length * 35) +
      'px; height: ' +
      (0 + game.rows.length * 35) +
      'px'
    "
  >
    <game-infopanel
      class="infopanel"
      :scores="game.scores"
      :count="game.count"
      :winner="game.winner"
      :level="game.level"
    />
    <div
      v-for="(y, ky) in game.rows"
      :key="ky"
      :style="'width: ' + game.rows.length * 45 + 'px'"
      class="row"
    >
      <div v-for="(x, kx) in game.columns" :key="kx">
        <div
          :id="x - 1 + (y - 1) * 8"
          class="ball"
          :data-check="printnum(x - 1, y - 1)"
          :style="draw(x - 1, y - 1)"
          @click="selectBall(x - 1, y - 1)"
        >
          {{ printnum(x - 1, y - 1) }}
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script setup lang="ts">
import GameInfopanel from './GameInfopanel.vue'
import { useGameStore } from '@/store/index'
import { Timer } from './../timer'
const t = new Timer()
t.start('interval')
const store = useGameStore()
const { game, genLevel, checkBall } = store
console.log(store)
console.log(game)
function draw (x:number, y:number) {
  const cl = game.board[x + y * game.columns.length]
  const delay = Math.random() * 3 + 1
  return {
    animationDelay: delay + 's',
    background:
          'rgb(' +
          cl.color.red +
          ',' +
          cl.color.green +
          ',' +
          cl.color.blue +
          ')',
    fontSize: game.count >= 1000 ? '10px' : 'auto'
  }
}
function printnum (x:number, y:number) {
  const b = game.board[x + y * game.columns.length]
  return b.status === 'OK' ? 'OK' : b.value
}
function selectBall (px:number, py:number) {
  const bl = game.rows.length * game.columns.length
  const pos = {
    x: px,
    y: py
  }
  checkBall(pos)
  // if (game.count === bl) {
  //   game.$store.dispatch('nextLevel')
  // }
}
function setnull () {
  localStorage.shultescores = 0
  localStorage.shultelevel = 1
  localStorage.shultebrlength = 5
}
</script>
<style scoped>
.infopanel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: rgba(210, 20, 125, 0.5);
  color: white;
  width: 100vw;
}
section {
  position: relative;
  margin: auto;
  margin-top: 50px;
  background-color: rgba(170, 90, 200, 0.4);
  padding: 15px;
  border: 1px solid rgba(170, 90, 200, 0.3);
  box-shadow: 0 0 5px 5px rgba(170, 90, 200, 0.3);
}
section > div {
  display: flex;
}
.ball::selection {
  background: transparent;
  cursor: pointer;
}
.ball {
  font-size: 14px;
  border-radius: 35%;
  width: 30px;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 27px;
  letter-spacing: 1px;
  margin: 1px;
  border: 1px dashed black;
  animation: 2s opacityeff infinite;
  cursor: pointer;
}
.ball[data-check="OK"] {
  border: 1px solid white;
  color: purple;
  background-color: silver !important;
   animation: none;
}
.check {
  border-radius: 25%;
  width: 35px;
  height: 35px;
  color: yellow;
  margin: 3px;
  border: 1px solid black;
  opacity: 0.7;
  background: red;
}
.check[data-status="true"] {
  background: green;
}
/*.check[data-status='false'] {
    background: red;
}*/
.time {
  color: white;
  border: 1px solid red;
}
@media screen and (max-width: 400px) {
  .ball {
    width: 25px;
    height: 25px;
  }
  .check {
    width: 30px;
    height: 30px;
  }
  section {
    padding: 5px;
  }
}
@keyframes opacityeff {
  0% {
    opacity: 0.8;
    transform: rotateZ(45deg);
  }
  25% {
    opacity: 0.6;
    transform: rotateZ(5deg);
  }
  50% {
    opacity: 1;
    transform: rotateZ(0deg);
  }
  75% {
    opacity: 0.6;
    transform: rotateZ(135deg);
  }
  100% {
    opacity: 1;
    transform: rotateZ(25deg);
  }
}
</style>
