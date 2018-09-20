<template>
  <div class="alert alert-dismissible alert-info" v-if="showInstallBanner">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    Do you want to <a href="#" @click.prevent="install">add this app to your home screen?</a>
  </div>
</template>

<script>
let installEvent;

export default {
  name: 'installPrompt',
  data() {
    return {
      showInstallBanner: false
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      installEvent = e;
      this.showInstallBanner = true;
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false;
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    }
  }
};
</script>

