<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app">
    <div v-for="(y,ky) in rows" :key="ky" >
      <div v-for="(x,kx) in columns"  :key="kx">
        <div class="ball"
          :id="x-1+(y-1)*8"
          :data-check="printnum(x-1,y-1)"
          @click="checkball(x-1,y-1)"
          :style="draw(x+Math.floor(Math.random()%10),((x*y)+Math.floor(Math.random()%10))%10,y+Math.floor(Math.random()%10))">
            {{printnum(x-1,y-1)}}
        </div>
      </div>
    </div>
    <div class="bar" :style="'width:'+board.length*2+'px'">
      <div class="pos" :style="'width:'+count*2+'px'"></div>
    </div>
    <div class="select">
      <div class="count">Count: {{count}}</div>
      <div class="scores">Scores: {{scores}}</div>
      <div>{{clickok}}</div>
      <div>{{current.hour+':'+current.minute+':'+current.second}}</div>
      <div class="winner" v-if="winner">You winner</div>
    </div>
    <ul class="timers">
      <li class="item" v-for="(c,k) in memory" :key="k">
        {{c.hour+':'+c.minute+':'+c.second}}
      </li>
    </ul>
  </div>
</template>

<script>
import { current } from './timer'

export default {
  data () {
    return {
      rows: [1, 2, 3, 4, 5, 6, 7, 8],
      columns: [1, 2, 3, 4, 5, 6, 7, 8],
      board: [],
      checked: [],
      scores: 0,
      count: 0,
      selnum: 0,
      winner: false,
      game: false,
      clickok: false,
      current: current,
      memory: []
    }
  },
  methods: {
    draw (x, y, r) {
      return {
        animationDelay: (x < 5 && y < 5) ? ('0.' + r + '' + x + '' + y + 's') : ('1.' + x + '' + r + '' + y + 's'),
        background: '#' + x + '5' + r + '2' + y + '2'

      }
    },
    generatenumbers () {
      let i = 0

      for (let y = 0; y < this.rows.length; y++) {
        for (let x = 0; x < this.columns.length; x++) {
          i++
          this.board.push(i)
        }
      }
      for (i = 0; i < 64; i++) {
        const b = this.board[i]
        const ni = Math.floor(Math.random() * 24)
        this.board[i] = this.board[ni]
        this.board[ni] = b
      }
    },
    printnum (x, y) {
      return this.board[x + y * 8]
    },
    checkball (x, y) {
      this.selnum = this.board[x + y * 8]
      this.checked.push(this.selnum)
      if (this.game === false) {
        this.game = true
        this.memory.push({
          hour: this.current.hour,
          minute: this.current.minute,
          second: this.current.second,
          mark: 'start'
        })
      }
      if (this.count < 64) {
        if (this.selnum - this.count !== 1) {
          this.scores -= 5
          this.clickok = false
        } else {
          this.count++
          this.scores += 5
          this.board[x + y * 8] = 'OK'
          this.clickok = true
        }
        if (this.count === 64) {
          this.winner = true
          this.memory.push({
            hour: this.current.hour,
            minute: this.current.minute,
            second: this.current.second,
            mark: 'end'
          })
          const dh = this.memory[1].hour - this.memory[0].hour
          const dm = this.memory[1].minute - this.memory[0].minute
          const ds = this.memory[1].second - this.memory[0].second

          this.memory.push({
            hour: (dh < 0) ? (this.memory[0].hour - this.memory[1].hour) : (dh),
            minute: (dm < 0) ? (this.memory[0].minute - this.memory[1].minute) : (dm),
            second: (ds < 0) ? (this.memory[0].second - this.memory[1].second) : (ds),
            mark: 'game'
          })
        }
      }
    }
  },
  created () {
    this.generatenumbers()
  }
}
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
@import './assets/style.less'
</style>
