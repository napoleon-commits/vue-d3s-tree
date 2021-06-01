<template>
  <div>
      <button @click="decreaseDepth">Decrease Depth</button>
      <span>{{$store.state.displayDepth}}</span>
      <button @click="increaseDepth">Increase Depth</button>
      <button @click="setDepth">Set Depth</button>
  </div>
</template>

<script>
export default {
    name: 'DepthController',
    methods: {
        setDepth(){
            this.$root.$emit("setDepth");
        },
        decreaseDepth(){
            if(this.$store.state.displayDepth > 2){
                this.$store.state.displayDepth -= 1;
            }
        },
        increaseDepth(){
            if(this.$store.state.displayDepth <= this.$store.state.maxTreeDepth){
                this.$store.state.displayDepth += 1;
            }
        },
    },
}
</script>

<style>

</style>
