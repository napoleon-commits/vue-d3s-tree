<template>
  <div></div>
</template>

<script>
export default {
    name: 'Selector',
    mounted(){
        console.log(this.$store.state.recognizedServiceBranches);
    }
}
</script>

<style>

</style>