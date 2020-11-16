export default {
  current: {
    hour:0,
    minute:0,
    second:0,
    mark:'contol',
    now(){
      let d=new Date();
      this.hour = d.getHours();
      this.minute = d.getMinutes();
      this.second = d.getSeconds();
    }
  }
}
/*window.onload = function() {
current.now();
setInterval(function() {current.now();}, 1000);
};
*/
