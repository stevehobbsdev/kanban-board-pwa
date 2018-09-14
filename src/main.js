// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  runtime.register();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },

  created() {
    store.commit('initializeStore');
  }
});
