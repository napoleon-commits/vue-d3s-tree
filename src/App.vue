<template>
  <div id="app">
    <Selector />
    <DepthController />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Selector from '@/components/Selector'
import DepthController from '@/components/DepthController'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Selector,
    DepthController
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
