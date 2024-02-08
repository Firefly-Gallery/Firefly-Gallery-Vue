// store.js
import { createStore } from 'vuex'

const smooth_scroll = createStore({
  state: {
    scroll: ''
  },
  mutations: {
    setScroll(state, newValue) {
      state.scroll = newValue;
    }
  },
  getters: {
    getScroll(state) {
      return state.scroll;
    }
  }
});

export default smooth_scroll
