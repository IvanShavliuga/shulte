<template>
  <section :style="'width: '+(260+level*40)+'px;'+'height: '+(280+level*40)+'px'">
    <div
      v-for="(y,ky) in rows"
      :key="ky"
      :style="'width: '+rows.length*45+'px'"
      class="row"
    >
      <div
        v-for="(x,kx) in columns"
        :key="kx"
      >
        <div
          :id="x-1+(y-1)*8"
          class="ball"
          :data-check="printnum(x-1,y-1)"
          :style="draw(x+Math.floor(Math.random()%10),((x*y)+Math.floor(Math.random()%10))%10,y+Math.floor(Math.random()%10))"
          @click="checkball(x-1,y-1)"
        >
          {{ printnum(x-1,y-1) }}
        </div>
      </div>
    </div>
    <barprogress
      :barlength="board.length"
      :barpos="count"
    />
    <infopanel
      :scores="scores"
      :count="count"
      :winner="winner"
      :level="level"
      @next="nextlevel"
    />
  </section>
</template>
<script>
import infopanel from './Infopanel.vue'
import barprogress from './Barprogress.vue'

export default {
  components: {
    infopanel,
    barprogress
  },
  data () {
    return {
      rows: [1, 2, 3, 4, 5],
      columns: [1, 2, 3, 4, 5],
      board: [],
      checked: [],
      scores: 0,
      count: 0,
      selnum: 0,
      winner: false,
      clickok: false,
      level: 1
    }
  },
  created () {
    this.generatenumbers()
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
      const bl = this.rows.length * this.columns.length

      for (let y = 0; y < this.rows.length; y++) {
        for (let x = 0; x < this.columns.length; x++) {
          i++
          this.board.push(i)
        }
      }
      for (i = 0; i < bl; i++) {
        const b = this.board[i]
        const ni = Math.floor(Math.random() * bl)
        this.board[i] = this.board[ni]
        this.board[ni] = b
      }
    },
    printnum (x, y) {
      const cl = this.columns.length
      return this.board[x + y * cl]
    },
    checkball (x, y) {
      const cl = this.columns.length
      const bl = this.rows.length * this.columns.length
      this.selnum = this.board[x + y * cl]
      this.checked.push(this.selnum)
      if (this.count < bl) {
        if (this.selnum - this.count !== 1) {
          this.scores -= 5
          this.clickok = false
        } else {
          this.count++
          this.scores += 5
          this.board[x + y * cl] = 'OK'
          this.clickok = true
        }
        if (this.count === bl) {
          this.winner = true
        }
      }
    },
    nextlevel () {
      this.rows.push(this.rows.length + 1)
      this.columns.push(this.columns.length + 1)
      this.board = []
      this.generatenumbers()
      this.level++
      this.count = 0
      this.winner = false
    }
  }
}
</script>
<style scoped>
section > div {
    display: flex;
}
.ball::selection {
    background:transparent;
    cursor: pointer;
}
.ball {
    border-radius: 45%;
    width: 35px;
    height: 35px;
    color: yellow;
    text-align: center;
    line-height: 35px;
    margin: 3px;
    border: 1px solid black;
    animation: 2s opacityeff infinite;
    cursor: pointer;
}
.ball[data-check='OK'] {
    border: 1px solid white;
    color: white;
}
.check {
    border-radius: 45%;
    width: 35px;
    height: 35px;
    color: yellow;
    text-align: center;
    line-height: 35px;
    margin: 3px;
    border: 1px solid black;
    opacity: 0.7;
    background: red;
}
.check[data-status='true'] {
    background: green;
}
/*.check[data-status='false'] {
    background: red;
}*/

@keyframes opacityeff {
    0% {
        opacity:0.1;
        transform:rotateZ(45deg);
    }
    25% {
        opacity:0.4;
         transform:rotateZ(5deg);
    }
    50% {
        opacity: 1;
         transform:rotateZ(0deg);
    }
    75% {
        opacity: 0.8;
         transform:rotateZ(135deg);
    }
    100% {
        opacity: 1;
         transform:rotateZ(25deg);
    }
}
</style>
