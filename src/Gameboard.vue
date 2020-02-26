<template>
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
{{sc}}
</div>
</template>
<script>
export default {
   props:{
       status: {
           type:String,
           required:true 
       },
       scores: {
           type:Number,
           required: true
       }
         
   },//props
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
           sc:0  
       } //return
   }, //data
   methods: {
       select(k1,k2) {
           this.board[k1][k2].click=true;
           let val=0;
           if(this.count<25)
              val = this.board[k1][k2].val;
           if(val-this.count!=1)
              this.sc-=5;
           else{
              this.board[k1][k2].yes=true; 
              this.count++;
              this.sc+=5;
           }//else
       }//select
   },//methods
   created() {
       
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
       this.sc=0;
   }//created
}    
</script>
