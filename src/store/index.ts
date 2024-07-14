import { defineStore } from 'pinia'
type Board = {
  value:number;
  status: string;
  color: {
    red: number;
    green: number;
    blue: number;
  }
}[]
type CheckBall = {
  x: number;
  y: number;
}
class ShulteGame {
  constructor () {
    this.genLevel()
  }

  rows:number[] = [];
  columns:number[] = [];
  board:Board = [];
  checked:number[] = [];
  scores = 0;
  count = 0;
  selnum = 0;
  winner = false;
  clickok = false;
  level = 1;
  loadflag = false;
  createdflag = false;
  msg = '';
  genLevel () {
    let i = 0
    const colors = [
      { red: 190, green: 20, blue: 20 },
      { red: 20, green: 190, blue: 20 },
      { red: 20, green: 20, blue: 190 },
      { red: 190, green: 20, blue: 190 },
      { red: 190, green: 190, blue: 20 },
      { red: 20, green: 140, blue: 190 },
      { red: 190, green: 100, blue: 20 }
    ]
    if (!this.createdflag) {
      for (let i = 0; i < 10; i++) {
        this.rows.push(i + 1)
        this.columns.push(i + 1)
      }
      this.createdflag = true
    }
    // state.scores = localStorage.ivShultescores
    //   ? +localStorage.ivShultescores
    //   : 0;
    // state.level = localStorage.shultelevel ? +localStorage.shultelevel : 1;

    const bl = this.rows.length * this.columns.length
    for (let y = 0; y < this.rows.length; y++) {
      for (let x = 0; x < this.columns.length; x++) {
        i++
        this.board.push({
          value: i,
          status: 'init',
          color: colors[i % colors.length]
        })
      }
    }
    for (i = 0; i < bl; i++) {
      const b = this.board[i]
      const ni = Math.floor(Math.random() * bl)
      this.board[i] = this.board[ni]
      this.board[ni] = b
    }
  }

  checkBall (ball:CheckBall) {
    const cl = this.columns.length
    const bl = this.rows.length * this.columns.length
    const posbr = ball.x + ball.y * cl
    this.selnum = this.board[posbr].value
    this.checked.push(this.selnum)
    if (this.count < bl) {
      if (this.selnum - this.count !== 1) {
        this.scores -= 5
        this.clickok = false
      } else {
        this.count++
        this.scores += 5
        this.board[posbr].status = 'OK'
        this.clickok = true
      }
    }
  }
}

export const useGameStore = defineStore('game', {
  state: () => ({ gameData: new ShulteGame() }),
  getters: {
    game: state => state.gameData
  },
  actions: {
    genLevel () {
      this.gameData.genLevel()
    },
    checkBall (ball:CheckBall) {
      this.gameData.checkBall(ball)
    }
  }
})
