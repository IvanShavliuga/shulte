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
}
.board {
  background-color:black;
  opacity: 0.7;
  margin: 45px auto;
  padding: 10px;
  width: 550px;
  height: 550px;
}
</style>
