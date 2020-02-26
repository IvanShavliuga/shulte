<template>
<main>
   <app-game-board :scores="scores" :status="status"></app-game-board>
   <app-scores :scores="scores" :status="status"></app-scores>
 
</main>  
</template>
<style lang="scss">
 body{
  background-color:grey;
  font-family: "Georgia";
    table{
        background-color:#fbc;
        border:4px outset #fbc;
        border-collapse:collapse;
      td{
        border:1px solid #c99;
        width:40px;
        height:40px;
        color:#00f;
        text-align:center;
        font-size:1.5em;
      }
      td:hover{
        background-color:#d0d;
      }
      .select {
        color: white;
        background-color:#d00;
      } 
      .success {
        color: white;
        background-color:#0d0;
      } 
      }
  .game{
    display:flex;
    justify-content:center;
    
  }
  .scorestable {
    p{
      margin-left:30px;
      color:white;
      font-weight:500;
      letter-spacing:1px;
      text-align:center;
    
    
    }
    .status{
      color:#0f0;
    }
    .scores{
      color:#ff0;
    }
  }  
}

</style>
<script>
import Scores from './Scores.vue';
import Gameboard from './Gameboard.vue';

export default {
   components: {
       appScores: Scores,
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
