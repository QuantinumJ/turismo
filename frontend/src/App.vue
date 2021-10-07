<template>
  <div id="app">
    <panel-nav>
    </panel-nav>
    <router-view />
  </div>
</template>

<script>

import panelNav from '@/components/PanelNav'
export default {
  name: "App",
  components: {
    panelNav
    
  }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
