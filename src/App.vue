<template>
  <div id="app">
    
    <div class="page-header">

      <install-prompt></install-prompt>
      
      <h1>Kanban Board</h1>
      <p class="lead">An example of a Kanban board, written in VueJS</p>
    </div>
    
    <menu-bar></menu-bar>

    <router-view/>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar';
import InstallPrompt from '@/components/InstallPrompt';

export default {
  name: 'app',
  components: {
    'menu-bar': MenuBar,
    InstallPrompt
  }
};
</script>

<style>
.page-header h1 {
  font-weight: 300;
}

body {
  padding-top: 1rem;
}
</style>
