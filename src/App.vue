<template>
  <main class="board">
    <board />
  </main>
</template>

<script>
import board from '@/components/Board.vue'

export default {
  name: 'App',
  components: {
    board
  }
}
</script>

<style lang="less">
body {
  background: url(https://ivanshavliuga.github.io/simples/photos/my/ufo-r.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center top;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.board {
  margin: auto;
  background-color: rgba(23, 24, 255, 0.2);
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
@media (max-width: 736px) {
  body {
    overflow: hidden;
  }
  body > div {
    overflow: hidden;
  }
}
</style>
