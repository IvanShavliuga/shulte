<template>
  <div class="bar" :style="'width:' + barlength * 5.5 + 'px'">
    <div class="pos" :style="'width:' + barpos * 2 + 'px'" />
  </div>
</template>
<script>
export default {
  props: {
    barlength: {
      type: Number,
      default: 0,
    },
    barpos: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style scoped>
.bar {
  height: 20px;
  background: #555;
}
.pos {
  color: white;
  font-size: 18px;
  background: #a5a;
  width: 10px;
  text-align: right;
}
</style>
