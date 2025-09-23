<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <TestApp1 msg="1"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TestApp1 from './components/TestApp1.vue'

export default {
  name: 'App',
  components: {
    TestApp1
  }
}
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
