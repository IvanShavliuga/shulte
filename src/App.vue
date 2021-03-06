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
  background-image:url(https://ivanshavliuga.github.io/simples/photos/my/coins.jpg);
  background-size: cover;
}
.board {
  background-color:black;
  opacity: 0.9;
  margin: 45px auto;
  padding: 10px;
  width: 350px;
  height: 350px;
  border: 1px dotted #df56d5;
}
</style>
