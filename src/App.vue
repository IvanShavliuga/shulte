<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="board">
    <board />
  </div>
</template>

<script>
import board from '@/components/Board.vue'
export default {
  components: {
    board
  }
}
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
body {
  background: url(https://ivanshavliuga.github.io/simples/photos/my/ufo-r.jpg) rgba(120, 120, 120, 0.7);
  background-size: cover;
  padding: 0;
  margin: 0;
}
.board {
  margin: 0;
  background-color: rgba(0,0,0, 0.7);
  padding: 10px;
  min-width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  max-height: 100%;
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
