<template>
  <div class="select">
    <div class="count">
      Count: {{ count }}
    </div>
    <div class="scores">
      Scores: {{ scores }}
    </div>
    <div class="level">
      Level: {{ level }}
    </div>
    <div
      v-if="winner"
      class="winner"
    >
      <span>You winner</span><br>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    winner: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 0
    },
    scores: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style scoped>
.select {
    color: #fff;
    word-spacing: 15px;
}
.select > div {
    margin: 5px 10px;
}
.winner > button {
  border: 1px solid white;
  background-color: transparent;
  padding: 3px 7px;
  color: yellow;
}
</style>
