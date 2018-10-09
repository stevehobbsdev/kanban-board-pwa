/**
 * Local Storage plugin
 * Saves the state of the store to local storage whenever the store is mutated.
 */
export default store => {
  store.subscribe((m, state) => {
    localStorage.setItem('boardState', JSON.stringify(state));
  });
};
