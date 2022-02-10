<template>
  <section :style="'width:' + (0 + columns.length * 35) + 'px; height: ' + (0 + rows.length * 35) + 'px'">
    <infopanel
      class="infopanel"
      :scores="scores"
      :count="count"
      :winner="winner"
      :level="level"
    />
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
          :style="draw(x-1,y-1)"
          @click="checkball(x-1,y-1)"
        >
          {{ printnum(x-1,y-1) }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import infopanel from './Infopanel.vue'
import { mapGetters } from 'vuex'
// import current from './../timer.js'

export default {
  components: {
    infopanel
  },
  computed: {
    ...mapGetters([
      'rows',
      'columns',
      'board',
      'checked',
      'scores',
      'count',
      'selnum',
      'winner',
      'clickok',
      'msg',
      'level'
    ])
  },
  created () {
    this.$store.dispatch('startApp')
  },
  methods: {
    draw (x, y) {
      const cl = this.board[x + y * this.columns.length]
      console.log(cl)
      const red = (~~(Math.random() * 128) + cl) % 128 + 16
      const blue = (~~(Math.random() * 128) + cl) % 128 + 16
      const green = (~~(Math.random() * 128) + cl) % 128 + 16
      return {
        animationDelay: (x < 5 && y < 5) ? ('0.' + x + '' + y + 's') : ('1.' + x + '' + '' + y + 's'),
        background: 'rgb(' + red + ',' + green + ',' + blue + ')'
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
      return this.board[x + y * this.columns.length]
    },
    checkball (px, py) {
      const bl = this.rows.length * this.columns.length
      const pos = {
        x: px,
        y: py
      }
      this.$store.dispatch('checkBall', pos)
      if (this.count === bl) {
        this.$store.dispatch('nextLevel')
      }
    },
    setnull () {
      localStorage.shultescores = 0
      localStorage.shultelevel = 1
      localStorage.shultebrlength = 5
    }
  }
}
</script>
<style scoped>
.infopanel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: rgba(210,20, 125,0.5);
  color: yellow;
  width: 100vw;
}
section {
  position: relative;
  margin: auto;
  margin-top: 50px;
  background-color: rgba(170,90,200, 0.4);
  padding: 15px;
  border: 1px solid rgba(170,90,200, 0.3);
  box-shadow: 0 0 5px 5px rgba(170,90,200, 0.3);
}
section > div {
    display: flex;
}
.ball::selection {
    background:transparent;
    cursor: pointer;
}
.ball {
    border-radius: 45%;
    width: 30px;
    height: 30px;
    color: yellow;
    text-align: center;
    line-height: 35px;
    margin: 1px;
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
.time {
  color: white;
  border: 1px solid red;
}

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
