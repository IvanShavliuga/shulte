<template>
<main>
   <app-game-board></app-game-board>
</main>
</template>

<script>

import Gameboard from './Gameboard.vue';

export default {
   components: {

       appGameBoard: Gameboard
   },
   data() {
       return {
           scores:0,
           time:59,
           status:"develop"
       }
   }
}

</script>
