<template>
  <div>
    <div
      v-for="(service, index) in recognizedServiceBranches"
      :key="index + service"
    >
      <input
        v-model="checkedServices"
        type="checkbox"
        :value="service"
        @click="toggleServiceBranch(service)"
      />
      <label style="cursor: pointer;" @click="toggleServiceBranch(service)">{{service}}</label>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Selector',
    computed: {
      recognizedServiceBranches(){
        return this.$store.state.recognizedServiceBranches;
      },
      checkedServices: {
        get: function(){
          return this.$store.state.checkedServices;
        },
        set: function(){},
      },
    },
    methods: {
      toggleServiceBranch(service){
        const tempServiceBranchArray = [];
        for(let i = 0; i < this.checkedServices.length; i+=1){
          tempServiceBranchArray.push(this.checkedServices[i]);
        }
        const index = tempServiceBranchArray.indexOf(service);
        if(index > -1){
          tempServiceBranchArray.splice(index, 1);
        } else {
          tempServiceBranchArray.push(service);
        }
        this.$store.state.checkedServices = tempServiceBranchArray;
      },
    },
}
</script>

<style>

</style>