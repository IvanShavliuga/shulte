<template>
<section>
<div class="game">
<table>
 <tr v-for="(r,k1) in board" :key="k1">
   <td :id="k1+''+k2" 
       v-for="(c,k2) in r" 
       :key="k2" 
       :class="[(c.click)?('select'):(''),(c.yes)?('success'):('')]"
       @click="select(k1,k2)"
   >{{c.val}}</td>
  </tr>    

</table>

</div>
<div class="scorestable">
<p class="status">{{status}} <span class="time">{{time}} s</span></p>
  <p class="scores">Очки: {{scores}}</p>
  <p>Таблица Шульте. Генерируется случайным образом поле (5 на 5). Собирайте числовую последовательность от 1 до 25 строго по порядку. </p>
  <button @click="start">Start</button><br>
  <p>{{CurrentTime.hour+":"+CurrentTime.minute+":"+CurrentTime.second}}</p> 
</div>
</section>
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
    margin-bottom: 40px;
    margin-top: 40px;
  }
  .scorestable {
    p{
      margin:0 auto;
      color:white;
      font-weight:500;
      letter-spacing:1px;
      text-align:center;
      width:400px;
    
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
import {current} from './timer';
export default {
   /*props:{
       status: {
           type:String,
           required:true 
       },
       scores: {
           type:Number,
           required: true
       }
         
   },*///props
   data() {
       return {
           board: [
              [{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false}],
              [{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false}],
              [{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false}],
              [{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false}],
              [{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false},{val:1,click:false,yes:false}]     
           ],
           count:0,
           scores:0,
           time:59,
           CurrentTime: current,
           status:"You game ..."  
       } //return
   }, //data
   methods: {
       select(k1,k2) {
           this.board[k1][k2].click=true;
           let val=0;
           if(this.count<25)
              val = this.board[k1][k2].val;
           if(val-this.count!=1)
              this.scores-=5;
           else{
              this.board[k1][k2].yes=true; 
              this.count++;
              this.scores+=5;
           }//else
       },//select
       timer() {
           this.time--;
           this.status = "You game ...";
           if(this.time===0){  
               this.status= "Game over";    
               this.count = 25;
           }
           if(this.count!=25) 
               setTimeout(this.timer,1000)
       },//timer
       start() {
           setInterval(()=>{this.timer();}, 1000);
       }   
   },//methods
   created() {
       current.now();
       setInterval(function() {current.now();}, 1000);
       let array=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
       for(let i=0; i<25; i++){
          let b=array[i];
          let ni=Math.floor(Math.random()*24);
          array[i]=array[ni];
          array[ni]=b;
       }
       let k1=0, k2=0;
       for(let i=0; i<25; i++) {
          this.board[k1][k2].val=array[i];
          this.board[k1][k2].click=false;
          k2++;
          if(k2>4) {
              k1++;
              k2=0;
              if(k1>4) {
                 k1=0; 
              } 
          }
       } 
       this.count=0;
       this.scores=0;
   }//created
}    
</script>
