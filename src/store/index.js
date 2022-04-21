import { createStore } from "vuex";
const MAX_LENGTH_BOARD = 13;
/**********************
 * level | length | summ
 * 1     | 4      | 4x4   = 16
 * 2     | 5      | 5x5   = 25
 * 3     | 6      | 6x6   = 36
 * 4     | 7      | 7x7   = 49
 * 5     | 8      | 8x8   = 64
 * 6     | 9      | 9x9   = 81
 * 7     | 10     | 10x10 = 100
 */
// Create a new store instance.
export default new createStore({
  state() {
    return {
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
      msg: "",
    };
  },
  mutations: {
    LOAD_GAME(state) {
      /* if (localStorage.shultebrlength && !state.loadflag) {
          for (let i = 0; i < localStorage.shultebrlength; i++) {
            state.rows.push(i + 1)
            state.columns.push(i + 1)
          }
          state.loadflag = true
        } else { */
      if (!state.createdflag) {
        for (let i = 0; i < 10; i++) {
          state.rows.push(i + 1);
          state.columns.push(i + 1);
        }
        state.createdflag = true;
      }
      // }
      state.scores = localStorage.shultescores ? +localStorage.shultescores : 0;
      state.level = localStorage.shultelevel ? +localStorage.shultelevel : 1;
    },
    GEN_LEVEL(state) {
      let i = 0;
      const colors = [
        { red: 190, green: 20, blue: 20 },
        { red: 20, green: 190, blue: 20 },
        { red: 20, green: 20, blue: 190 },
        { red: 190, green: 20, blue: 190 },
        { red: 190, green: 190, blue: 20 },
        { red: 20, green: 140, blue: 190 },
        { red: 190, green: 100, blue: 20 },
      ];
      const bl = state.rows.length * state.columns.length;
      for (let y = 0; y < state.rows.length; y++) {
        for (let x = 0; x < state.columns.length; x++) {
          i++;
          state.board.push({
            value: i,
            status: "init",
            color: colors[i % colors.length],
          });
        }
      }
      for (i = 0; i < bl; i++) {
        const b = state.board[i];
        const ni = Math.floor(Math.random() * bl);
        state.board[i] = state.board[ni];
        state.board[ni] = b;
      }
    },
    SAVE_GAME(state) {
      localStorage.shultebrlength = state.columns.length;
      localStorage.shultescores = state.scores;
      localStorage.shultelevel = state.level;
    },
    NEXT_LEVEL(state) {
      if (state.rows.length < MAX_LENGTH_BOARD) {
        state.rows.push(state.rows.length + 1);
        state.columns.push(state.columns.length + 1);
        state.board = [];
        state.level++;
        state.count = 0;
        state.winner = false;
      }
    },
    SAVE_MSG(state) {
      state.msg = "save";
    },
    CHECK_BALL(state, obj) {
      const cl = state.columns.length;
      const bl = state.rows.length * state.columns.length;
      const posbr = obj.x + obj.y * cl;
      state.selnum = state.board[posbr].value;
      state.checked.push(state.selnum);
      if (state.count < bl) {
        if (state.selnum - state.count !== 1) {
          state.scores -= 5;
          state.clickok = false;
        } else {
          state.count++;
          state.scores += 5;
          state.board[posbr].status = "OK";
          state.clickok = true;
        }
      }
    },
  },
  actions: {
    startApp({ commit }) {
      commit("LOAD_GAME");
      commit("GEN_LEVEL");
    },
    nextLevel({ commit }) {
      commit("SAVE_GAME");
      commit("NEXT_LEVEL");
      commit("GEN_LEVEL");
    },
    testApp({ commit }) {
      commit("SAVE_MSG");
    },
    checkBall({ commit }, obj) {
      commit("CHECK_BALL", obj);
    },
  },
  getters: {
    rows: (state) => state.rows,
    columns: (state) => state.columns,
    board: (state) => state.board,
    checked: (state) => state.checked,
    scores: (state) => state.scores,
    count: (state) => state.count,
    selnum: (state) => state.selnum,
    winner: (state) => state.winner,
    clickok: (state) => state.clickok,
    msg: (state) => state.msg,
    level: (state) => state.level,
  },
});
