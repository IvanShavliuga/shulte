var count=0, scores=0, time=0
var generate=function(){
  var array=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  for(i=0; i<25; i++){
    b=array[i];
    ni=Math.floor(Math.random()*24);
    array[i]=array[ni];
    array[ni]=b;
  }
  
  for(i=0; i<25; i++){
    $("#"+(i+1)).text(array[i]);
  }
}
timer=()=>{
  time++
  $(".status").text("Вы играете "+time)
  if(time==60){ $(".status").text("Время вышло") 
               count = 25
              }
  if(count!=25) setTimeout(timer,1000)
}
$(document).ready(function(){
    generate()
    setTimeout(timer,1000)
    
    $("td").click(function(){
      if(count<25){
      val = +$(this).text();
      if(val-count!=1)
          scores-=5
      else{
          $(this).css("background-color", "purple");
        count++
        scores+=5
        
      }
      
      if(count==25){
        $(".status").text("Вы победили")
        
      }
      }  
      $(".scores").text("Очки:"+scores)
      if(scores>80)
         $(".scores").css("color","#0f0")
      else if(scores<80&&scores>40)
           $(".scores").css("color","#ff0")
      else
           $(".scores").css("color","#f00")
    })
})
