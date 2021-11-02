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
  background: rgba(0,0,0, 0.9);
  padding: 0;
  margin: 0;
}
.board {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: url(https://ivanshavliuga.github.io/simples/photos/my/ufo-r.jpg) rgba(0,0,0, 0.9);
  background-size: 99% 99%;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 0;
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
