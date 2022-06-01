<template>
  <div class="select">
    <div>
      <div class="count">Count: {{ count }}</div>
      <div class="scores">Scores: {{ scores }}</div>
      <div v-if="winner" class="winner"><span>You winner</span><br /></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    winner: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Number,
      default: 0,
    },
    scores: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style scoped>
.select {
  color: #fff;
  word-spacing: 15px;
}
.select > div {
  display: flex;
  margin: 5px auto;
  max-width: 35vw;
}
.select > div > div {
  margin: 5px 15px;
}
.winner > button {
  border: 1px solid white;
  background-color: transparent;
  padding: 3px 7px;
  color: yellow;
}
@media screen and (max-width: 400px) {
  .select {
    word-spacing: 5px;
  }
  .select > div {
    display: flex;
    margin: 5px auto;
    max-width: 100vw;
  }
  .select > div > div {
    margin: 5px;
  }
}
</style>
