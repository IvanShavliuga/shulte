export const current = {
  hour: 0,
  minute: 0,
  second: 0,
  now () {
    const d = new Date()
    this.hour = d.getHours()
    this.minute = d.getMinutes()
    this.second = d.getSeconds()
    /* $("#timer").text(this.hour+":" +this.minute+":"+this.second);
      */
  }
}
window.onload = function () {
  /* setInterval(()=>{
 let dt=new Date();

current.hour=dt.getHours();
current.minute=dt.getMinutes();
current.second=dt.getSeconds();
$("#timer").text(current.hour+":"+current.minute+":"+current.second);
   }, 1000); */
  current.now()
  setInterval(function () { current.now() }, 1000)
}
