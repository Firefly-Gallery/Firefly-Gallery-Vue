// store.js
import { createStore } from 'vuex'

const components = createStore({
  state: {
    scroll: '',
    SetNavbarTransparency: ''
  },
  mutations: {
    setScroll(state, newValue) {
      state.scroll = newValue;
    },
    setNavbar(state, newValue) {
      state.SetNavbarTransparency = newValue;
    },
  },
  getters: {
    getScroll(state) {
      return state.scroll;
    },
    getNavbar(state) {
      return state.SetNavbarTransparency;
    },
  }
});

export default components
