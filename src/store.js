import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
const store = new Vuex.Store({
  state: {
    items: {
      todo: [],
      inProgress: [],
      done: []
    },
    nextId: 1
  },
  mutations: {
    addItem(state, item) {
      state.items.todo.push(Object.assign(item, { id: state.nextId }));
      state.nextId += 1;
    },
    updateItems(state, { items, id }) {
      state.items[id] = items;
    },
    initializeStore() {
      const data = localStorage.getItem('boardState');

      if (data) {
        this.replaceState(Object.assign(this.state, JSON.parse(data)));
      }
    }
  }
});

store.subscribe((m, state) => {
  localStorage.setItem('boardState', JSON.stringify(state));
});

export default store;
