import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rows: [],
    columns: [],
    board: [],
    checked: [],
    scores: 0,
    count: 0,
    selnum: 0,
    winner: false,
    clickok: false,
    level: 1,
    loadflag: false,
    createdflag: false,
    msg: ''
  },
  mutations: {
    LOAD_GAME (state) {
      if (localStorage.shultebrlength && !state.loadflag) {
        for (let i = 0; i < localStorage.shultebrlength; i++) {
          state.rows.push(i + 1)
          state.columns.push(i + 1)
        }
        state.loadflag = true
      } else {
        if (!state.createdflag) {
          for (let i = 0; i < 4; i++) {
            state.rows.push(i + 1)
            state.columns.push(i + 1)
          }
          state.createdflag = true
        }
      }
      state.scores = (localStorage.shultescores) ? (+localStorage.shultescores) : (0)
      state.level = (localStorage.shultelevel) ? (+localStorage.shultelevel) : (1)
    },
    GEN_LEVEL (state) {
      let i = 0
      const bl = state.rows.length * state.columns.length
      for (let y = 0; y < state.rows.length; y++) {
        for (let x = 0; x < state.columns.length; x++) {
          i++
          state.board.push(i)
        }
      }
      for (i = 0; i < bl; i++) {
        const b = state.board[i]
        const ni = Math.floor(Math.random() * bl)
        state.board[i] = state.board[ni]
        state.board[ni] = b
      }
    },
    SAVE_GAME (state) {
      localStorage.shultebrlength = state.columns.length
      localStorage.shultescores = state.scores
      localStorage.shultelevel = state.level
    },
    NEXT_LEVEL (state) {
      state.rows.push(state.rows.length + 1)
      state.columns.push(state.columns.length + 1)
      state.board = []
      state.level++
      state.count = 0
      state.winner = false
    },
    SAVE_MSG (state) {
      state.msg = 'save'
    },
    CHECK_BALL (state, obj) {
      const cl = state.columns.length
      const bl = state.rows.length * state.columns.length
      const posbr = obj.x + obj.y * cl
      state.selnum = state.board[posbr]
      state.checked.push(state.selnum)
      if (state.count < bl) {
        if (state.selnum - state.count !== 1) {
          state.scores -= 5
          state.clickok = false
        } else {
          state.count++
          state.scores += 5
          state.board[posbr] = 'OK'
          state.clickok = true
        }
      }
    }
  },
  actions: {
    startApp ({ commit }) {
      commit('LOAD_GAME')
      commit('GEN_LEVEL')
    },
    nextLevel ({ commit }) {
      commit('SAVE_GAME')
      commit('NEXT_LEVEL')
      commit('GEN_LEVEL')
    },
    testApp ({ commit }) {
      commit('SAVE_MSG')
    },
    checkBall ({ commit }, obj) {
      commit('CHECK_BALL', obj)
    }
  },
  getters: {
    rows: state => state.rows,
    columns: state => state.columns,
    board: state => state.board,
    checked: state => state.checked,
    scores: state => state.scores,
    count: state => state.count,
    selnum: state => state.selnum,
    winner: state => state.winner,
    clickok: state => state.clickok,
    msg: state => state.msg,
    level: state => state.level
  }
})
