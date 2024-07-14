type ModeTimer = 'current' | 'interval'
export class Timer {
  constructor () {
    this.start()
  }

  interval = {
    hour: 0,
    minute: 0,
    second: 0
  }

  current = {
    hour: 0,
    minute: 0,
    second: 0
  };

  intervalId = 0;
  currentId = 0;
  now () {
    const d = new Date()
    this.current.hour = d.getHours()
    this.current.minute = d.getMinutes()
    this.current.second = d.getSeconds()
    // console.log(`${this.current.hour}:${this.current.minute}:${this.current.second}`)
  }

  play () {
    if (!this.intervalId) {
      this.play()
    }
    // console.log(`${this.interval.hour}:${this.interval.minute}:${this.interval.second}`)
    this.interval.second++
    if (this.interval.second > 59) {
      this.interval.second = 0
      this.interval.minute++
      if (this.interval.minute > 59) {
        this.interval.hour++
        this.interval.minute = 0
        if (this.interval.hour > 23) {
          this.stop('interval')
        }
      }
    }
  }

  start (mode:ModeTimer = 'current') {
    if (mode === 'current') {
      if (!this.currentId) {
        this.currentId = setInterval(() => this.now(), 1000)
      }
    } else if (mode === 'interval') {
      this.interval.hour = 0
      this.interval.minute = 0
      this.interval.second = 0
      this.intervalId = setInterval(() => this.play(), 1000)
    }
  }

  stop (mode:ModeTimer = 'current') {
    if (mode === 'current') {
      if (this.currentId) {
        clearInterval(this.currentId)
      }
    } else if (mode === 'interval') {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    }
  }
}
/* window.onload = function () {
  /* setInterval(()=>{
 let dt=new Date();

current.hour=dt.getHours();
current.minute=dt.getMinutes();
current.second=dt.getSeconds();
$("#timer").text(current.hour+":"+current.minute+":"+current.second);
   }, 1000); */
/*  current.now()
  setInterval(function () { current.now() }, 1000)
} */
